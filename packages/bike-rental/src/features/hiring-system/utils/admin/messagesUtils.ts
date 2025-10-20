// TODO: Replace with actual Supabase client integration
declare const supabase: any;

import type { AdminMessage } from './types';
import { generatePlaceholderEmail } from './types';

// Function to fetch all messages
export const fetchAllMessages = async (): Promise<AdminMessage[]> => {
  // Fetch all messages
  const { data: messagesData, error: messagesError } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (messagesError) {
    console.error('Error fetching messages:', messagesError);
    throw messagesError;
  }

  // Fetch all unique user IDs from messages (senders and recipients)
  const userIds = [...new Set([
    ...messagesData.map(msg => msg.sender_id),
    ...messagesData.map(msg => msg.recipient_id)
  ])];

  // Fetch profiles for all these users
  const { data: profilesData, error: profilesError } = await supabase
    .from('profiles')
    .select('id, first_name, last_name')
    .in('id', userIds);

  if (profilesError) {
    console.error('Error fetching profiles for messages:', profilesError);
    throw profilesError;
  }

  // Create maps for quick lookup
  const profilesMap = new Map();
  profilesData.forEach(profile => {
    profilesMap.set(profile.id, {
      first_name: profile.first_name,
      last_name: profile.last_name
    });
  });

  // Generate placeholder emails based on profile data
  const emailMap = new Map();
  userIds.forEach(id => {
    const profile = profilesMap.get(id);
    if (profile) {
      emailMap.set(id, generatePlaceholderEmail({ first_name: profile.first_name, last_name: profile.last_name, id: id }));
    } else {
      emailMap.set(id, `user-${id.substring(0, 8)}@example.com`);
    }
  });

  // Fetch all booking IDs from messages
  const bookingIds = [...new Set(
    messagesData.map(msg => msg.booking_id).filter(Boolean)
  )];

  // Fetch booking data if there are any bookings
  let bookingsMap = new Map();
  if (bookingIds.length > 0) {
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('id, car_id, cars (brand, name)')
      .in('id', bookingIds);

    if (bookingsError) {
      console.error('Error fetching bookings for messages:', bookingsError);
    } else if (bookingsData) {
      bookingsData.forEach(booking => {
        bookingsMap.set(booking.id, {
          id: booking.id,
          car_id: booking.car_id,
          cars: {
            brand: booking.cars?.brand || 'Unknown',
            name: booking.cars?.name || 'Unknown'
          }
        });
      });
    }
  }

  // Now build the admin messages with all the data
  const adminMessages = messagesData.map(message => {
    const senderProfile = profilesMap.get(message.sender_id);
    const recipientProfile = profilesMap.get(message.recipient_id);
    const booking = message.booking_id ? bookingsMap.get(message.booking_id) : undefined;

    return {
      id: message.id,
      content: message.content,
      created_at: message.created_at,
      is_read: message.is_read,
      sender_id: message.sender_id,
      recipient_id: message.recipient_id,
      booking_id: message.booking_id,
      sender: {
        email: emailMap.get(message.sender_id) || 'unknown@example.com',
        profile: senderProfile || { first_name: null, last_name: null }
      },
      recipient: {
        email: emailMap.get(message.recipient_id) || 'unknown@example.com',
        profile: recipientProfile || { first_name: null, last_name: null }
      },
      booking: booking
    };
  });

  return adminMessages as AdminMessage[];
};

// Function to send a message
export const sendMessage = async (
  recipientId: string,
  content: string,
  bookingId?: string
): Promise<void> => {
  const { error } = await supabase.from('messages').insert({
    sender_id: (await supabase.auth.getSession()).data.session?.user.id,
    recipient_id: recipientId,
    content,
    booking_id: bookingId || null,
    is_read: false
  });

  if (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Function to mark a message as read
export const markMessageAsRead = async (messageId: string): Promise<void> => {
  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('id', messageId);

  if (error) {
    console.error('Error marking message as read:', error);
    throw error;
  }
};
