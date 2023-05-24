'use client';

import styles from './page.module.scss';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useSession, signIn, signOut } from "next-auth/react";
import discord from "next-auth/providers/discord";

// error message lookup
const errorMessages: Record<string, string> = {
  "OAuthSignin": "An error occurred while signing in with Discord.",
  "OAuthCallback": "An error occurred while authenticating with Discord.",
  "OAuthCreateAccount": "An error occurred while creating your account.",
  "EmailCreateAccount": "An error occurred while creating your account.",
  "Callback": "An error occurred while signing in.",
  "OAuthAccountNotLinked": "An error occurred while signing in with Discord.",
  "EmailSignin": "An error occurred while signing in with your email.",
  "CredentialsSignin": "An error occurred while signing in with your credentials.",
  "SessionRequired": "You must be signed in to access this page.",
  "Default": "An error occurred while signing in.",
};

export default function SignIn() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl");

  return (
    <div className={styles["page__container"]}>
      <div className={styles["card"]}>
        <div className={styles["card__header"]}>
          <h1 className={styles["card__title"]}>Sign in</h1>
        </div>
        <div className={styles["card__body"]}>
          <p>Welcome to the far lands...</p>
        </div>
        <div className={styles["card__content"]}>
          <div className={styles["card__button"]} onClick={() => (signIn("discord", { discord, callbackUrl: callbackUrl as string }))}>
            <Image src="/img/icons/discord_icon.svg" alt='discord logo' height={28} width={28} />
            <span className={styles["card__button__text"]}>
              Sign in using discord
            </span>
          </div>
          {
            error && (
              <div className={styles["card__error"]}>
                {errorMessages[error] ?? errorMessages["Default"]}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}