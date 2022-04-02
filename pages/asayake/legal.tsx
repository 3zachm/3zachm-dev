import { Button, Link as CardLink } from "@nextui-org/react";
import Link from "next/link";
import { ReactElement } from "react";
import HomeHead from "../../components/HomeHead";
import HomeLayout from "../../layouts/HomeLayout";
import { homeMain } from "../../layouts/NavTemplates";

function Legal() {
    return (
        <>
            <HomeHead title="Asayake | ToS & Privacy" description="ToS for Asayake" path="/asayake/legal" />
            <div className="w-screen h-screen bg-zinc-900 fixed top-0 left-0 right-0 bottom-0"/>
            <div className="z-10 w-[50vw] color-white mt-32 mb-32 pointer-events-auto">
                <Button auto color="secondary" className="mb-5">
                    <Link href="/asayake" passHref>
                        <CardLink>
                            <p className="text-white">Go back</p>
                        </CardLink>
                    </Link>
                </Button>
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-4xl mt-5 mb-5">Terms of Service</h1>
                        <h2 className="text-2xl mt-5 mb-5">Usage Agreement</h2>
                        <p>
                            Usage of Asayake is subject to the following terms and conditions. By using Asayake, you are agreeing to be bound by these terms and conditions mentioned below in this document.
                        </p>
                        <p>
                            Inviting the bot to your server permits storage of your server&apos;s data for proper functionality as described in the privacy policy below.
                        </p>
                        <h2 className="text-2xl mt-5 mb-5">Affiliation</h2>
                        <p>
                            Asayake is not affiliated with any of the services or servers that it is used on. Asayake is not responsible for any content posted on any of the services or servers that it is used on. Asayake is not affiliated or maintained by Discord Inc., nor do we own any assets associated with Discord.
                        </p>
                        <h2 className="text-2xl mt-5 mb-5">Liability</h2>
                        <p>
                            Asayake is not liable for any loss or damage caused by the use of Asayake, whether such be lost or damaged data, or any other damages that may arise from the use of Asayake. Please be mindful of servers and services that you invite the bot to. Access to the bot may be removed if usage is deemed to be in violation of the Terms of Service, or if activities by the end user are deemed malicious or illegal. Illegal activity includes violations of the Discord ToS and community guidelines.
                        </p>
                        <h2 className="text-2xl mt-5 mb-5">Contact</h2>
                        <p>
                            If you have any questions or concerns about the Terms of Service, please contact us at <a href="mailto:zach@3zachm.dev" className="text-blue-100 hover:animate-pulse">zach@3zachm.dev</a> | <a href="mailto:3zachm4@gmail.com" className="text-blue-100 hover:animate-pulse">3zachm4@gmail.com</a> or through discord DM via 3zachm#9999.
                        </p>
                        <h1 className="text-4xl mt-10 mb-5">Privacy Policy</h1>
                        <h2 className="text-2xl mt-5 mb-5">Information We Collect</h2>
                        <p className="mb-2">
                            Asayake collects information about servers the bot is used in. This includes the server ID and an optional role ID setting. More precisely:
                        </p>
                        <ul>
                            <li>
                                <b>id</b> - the server ID
                            </li>
                            <li>
                                <b>role</b> - the role ID associated with the server ID, which is not required to function
                            </li>
                        </ul>
                        <p>
                            Asayake does not collect any other information.
                        </p>
                        <h2 className="text-2xl mt-5 mb-5">Updating Data</h2>
                        <p>
                            Asayake stores associated server IDs in a database on server join. Role IDs are optional and may be set by the user through commands. If they are set, the bot will add the role ID to the associated server ID in the database.
                        </p>
                        <h2 className="text-2xl mt-5 mb-5">Temporary Data Storage</h2>
                        <p>
                            Asayake stores temporary data in cache to function properly as per the discord API. This data is deleted after a set amount of time and may be deleted at any time earlier through user driven actions (i.e. removing the bot from a server).
                        </p>
                        <h2 className="text-2xl mt-5 mb-5">Deleting Data</h2>
                        <p>
                            Asayake does not delete any data. If you wish to delete your server data, please contact us as outlined in the Contact section of the Terms of Service. You will need to provide evidence that you are an owner or administrator of the associated server ID.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

Legal.getLayout = function getLayout(page: ReactElement) {
    return (
        <HomeLayout navOptions={homeMain}>{page}</HomeLayout>
    )
}
export default Legal;