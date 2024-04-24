import Link from "next/link";
import styles from "./page.module.scss";

export default function page() {
  return (
    <div className={styles["page__container"]}>
      <main className={styles["page__main"]}>
        <div className={styles["main__header"]}>
          <div className={styles["main__header__title"]}>
            <h1>Terms of Service</h1>
            <h3>Last updated April 6, 2022</h3>
          </div>
          <Link href="/asayake">
            <div className={styles["main__header__button"]}>
              <BackArrow />
            </div>
          </Link>
        </div>
        <div className={styles["main__body"]}>
          <h2>Usage Agreement</h2>
          <p>Usage of Asayake is subject to the following terms and conditions. By using Asayake, you are agreeing to be bound by these terms and conditions mentioned below in this document.</p>
          <p>Inviting the bot to your server permits storage of your server&apos;s data for proper functionality as described in the privacy policy below.</p>
          <h2>Affiliation</h2>
          <p>Asayake is not affiliated with any of the services or servers that it is used on. Asayake is not responsible for any content posted on any of the services or servers that it is used on. Asayake is not affiliated or maintained by Discord Inc., nor do we own any assets associated with Discord.</p>
          <h2>Liability</h2>
          <p>Asayake is not liable for any loss or damage caused by the use of Asayake, whether such be lost or damaged data, or any other damages that may arise from the use of Asayake. Please be mindful of servers and services that you invite the bot to. Access to the bot may be removed if usage is deemed to be in violation of the Terms of Service, or if activities by the end user are deemed malicious or illegal. Illegal activity includes violations of the Discord ToS and community guidelines.</p>
          <h2>Contact</h2>
          <p>If you have any questions or concerns about the Terms of Service, please contact us at zach@3zachm.dev or through discord DM via @3zachm</p>

          <h1>Privacy Policy</h1>
          <h2>Information We Collect</h2>
          <p>Asayake collects information about servers (guilds) the bot is used in. This includes the server ID and an optional role ID setting. More precisely:</p>
          <ul>
            <li>id - the guild ID</li>
            <li>role - the role ID associated with the guild ID, which is not required to function</li>
          </ul>
          <p>Asayake does not collect any other information.</p>
          <h2>Updating Data</h2>
          <p>Asayake stores associated server IDs in a database on server join. Role IDs are optional and may be set by the user through commands. If they are set, the bot will add the role ID to the associated server ID in the database.</p>
          <h2>Temporary Data Storage</h2>
          <p>Asayake stores temporary data in cache to function properly as per the discord API. This data is deleted after a set amount of time and may be deleted at any time earlier through user driven actions (i.e. removing the bot from a server).</p>
          <h2>Deleting Data</h2>
          <p>Asayake deletes server information when the bot is removed from your guild. If you wish to ensure the deletion of your server data, please contact us as outlined in the Contact section of the Terms of Service. You will need to provide evidence that you are an owner or administrator of the associated server ID.</p>
        </div>
      </main>
    </div>
  );
}

const BackArrow = () => {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z"
        strokeWidth="0.1"
        stroke="currentColor"
        fill="currentColor"
      />
    </svg>
  )
}