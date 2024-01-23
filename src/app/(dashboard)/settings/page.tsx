import {FC} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import OverviewForms from "@/components/forms/OverviewForms";
import SocialMediaForms from "@/components/forms/SocialMediaForms";
import TeamsForms from "@/components/forms/TeamsForms";


interface SettingsPageProps {

}

const SettingsPage: FC<SettingsPageProps> = () => {
    return (
        <div>
            <div className={"font-semibold text-3xl mb-5"}>Settings</div>

            <Tabs defaultValue="overview">
                <TabsList className={"mb-8"}>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="socialLinks">Social Links</TabsTrigger>
                    <TabsTrigger value="teams">Teams</TabsTrigger>
                </TabsList>
                <TabsContent value="overview">
                    <OverviewForms/>
                </TabsContent>
                <TabsContent value="socialLinks">
                    <SocialMediaForms/>
                </TabsContent>
                <TabsContent value="teams">
                    <TeamsForms/>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default SettingsPage