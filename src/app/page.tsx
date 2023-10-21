import classes from '@/app/page.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faInstagram,
  faSpotify,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'
import { getSpotifyNowPlaying } from '@/spotify/api'

export default async function Home() {
  const spotifyInfo = await getSpotifyNowPlaying()

  return (
    <main className={classes.main}>
      <div className={classes.heading}>
        <Image
          src="https://avatars.githubusercontent.com/alyxmp4"
          alt="avatar"
          width={90}
          height={90}
          className={classes.avatar}
        />
        <h2>
          Hey I&apos;m Arsen and I&apos;m full-stack developer.{' '}
          <span
            style={{
              color: 'darkgrey',
            }}
          >
            Nothing really extraordinary, right?
          </span>{' '}
        </h2>
      </div>
      <div className={classes.cards}>
        <div className={classes.card}>
          <a href="https://instagram.com/alyxmp4">
            <FontAwesomeIcon
              icon={faInstagram}
              focusable={true}
              size="2xl"
              className={classes.cardIcon}
            />
          </a>
          <div className={classes.cardMeta}>
            <a
              href="https://instagram.com/alyxmp4"
              className={classes.cardTitle}
            >
              <h3>Instagram</h3>
            </a>
            <p className={classes.cardDescription}>
              None of me personality in there but why not?
            </p>
          </div>
        </div>
        <div className={classes.card}>
          <a href="https://t.me/alyxmp4">
            <FontAwesomeIcon
              icon={faTelegram}
              focusable={true}
              size="2xl"
              className={classes.cardIcon}
            />
          </a>
          <div className={classes.cardMeta}>
            <a
              href="https://instagram.com/alyxmp4"
              className={classes.cardTitle}
            >
              <h3>Telegram</h3>
            </a>
            <p className={classes.cardDescription}>
              They call it privacy, and you can text me anytime there
            </p>
          </div>
        </div>
        <div className={classes.card}>
          <a href="https://github.com/alyxmp4">
            <FontAwesomeIcon
              icon={faGithub}
              focusable={true}
              size="2xl"
              className={classes.cardIcon}
            />
          </a>
          <div className={classes.cardMeta}>
            <a href="https://github.com/alyxmp4" className={classes.cardTitle}>
              <h3>Github</h3>
            </a>
            <p className={classes.cardDescription}>
              Didn&apos;t you forget I am a dev? Check some repos there!
            </p>
          </div>
        </div>
        {spotifyInfo.isPlaying ? (
          <div className={classes.card}>
            <a href={spotifyInfo.trackUrl}>
              <Image
                src={spotifyInfo.albumImage as string}
                alt="album"
                width={48}
                height={48}
                className={classes.albumImage}
              />
            </a>
            <div className={classes.cardMeta}>
              <a href={spotifyInfo.trackUrl} className={classes.cardTitle}>
                <h3>{spotifyInfo.name}</h3>
              </a>
              <a
                href={spotifyInfo.artistLink}
                className={`${classes.cardDescription} ${classes.artistUrl}`}
              >
                <FontAwesomeIcon icon={faSpotify} /> {spotifyInfo.artist} • Now
                listening to on Spotify
              </a>
            </div>
          </div>
        ) : (
          <></>
        )}
        <a
          href="mailto: me@alyxmp4.pro"
          style={{
            color: 'darkgrey',
          }}
        >
          me@alyxmp4.pro
        </a>
      </div>
    </main>
  )
}
