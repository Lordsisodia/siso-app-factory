interface Activity {
    id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    displayOrder: number;
}
interface ActivitiesManagementProps {
    initialActivities?: Activity[];
}
export default function ActivitiesManagement({ initialActivities }: ActivitiesManagementProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=component.d.ts.map