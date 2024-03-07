import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/sender/$id/crashlytics")({
    component: Index,
});

export default function Index() {
    return <div>Analytics page</div>
}