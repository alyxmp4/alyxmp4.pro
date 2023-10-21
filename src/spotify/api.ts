import * as querystring from 'querystring'

export type SpotifyOauth2Response = {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

export type SpotifyNowPlayingResponse = {
  currently_playing_type?: string
  progress_ms?: number
  timestamp?: number
  context?: {
    spotify: string
    href: string
    type: string
    uri: string
  }
  program_ms?: number
  item?: {
    album: {
      album_type: string
      artists: Array<{
        external_urls: {
          spotify: string
        }
        href: string
        id: string
        name: string
        type: string
        uri: string
      }>
      available_markets: Array<string>
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      images: Array<{
        height: number
        url: string
        width: number
      }>
      name: string
      type: string
      uri: string
      total_tracks: number
      release_date: string
      release_date_precision: string
    }
    artists: Array<{
      external_urls: {
        spotify: string
      }
      href: string
      id: string
      name: string
      type: string
      uri: string
    }>
    available_markets: Array<string>
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: any
    external_urls: {
      spotify: string
    }
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
  }
  current_time_type?: string
  actions?: any
  is_playing?: boolean
  isPlaying: boolean
}

export type SpotifyInternalResponse = {
  artist?: string
  artistLink?: string
  name?: string
  trackUrl?: string
  albumImage?: string
  previewUrl?: string
  duration?: number
  progress?: number
  isPlaying?: boolean
}

const {
  SPOTIFY_OAUTH2_CLIENT_ID,
  SPOTIFY_OAUTH2_CLIENT_SECRET,
  SPOTIFY_OAUTH2_REFRESH_TOKEN,
  SPOTIFY_API_TOKEN_ENDPOINT,
  SPOTIFY_API_PLAYING_ENDPOINT,
} = process.env

const basic = Buffer.from(
  `${SPOTIFY_OAUTH2_CLIENT_ID}:${SPOTIFY_OAUTH2_CLIENT_SECRET}`,
).toString('base64')

const ObtainOauth2AccessToken = async () => {
  return await fetch(SPOTIFY_API_TOKEN_ENDPOINT as string, {
    method: 'post',
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_OAUTH2_REFRESH_TOKEN as string,
    }),
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    next: {
      revalidate: 3600,
    },
  }).then((res) => res.json())
}

const nowPlaying = async (): Promise<SpotifyNowPlayingResponse> => {
  const { access_token } = (await ObtainOauth2AccessToken().catch(() => {
    return { isPlaying: false }
  })) as SpotifyOauth2Response

  return await fetch(SPOTIFY_API_PLAYING_ENDPOINT as string, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  }).then((res) => {
    return res.json()
  })
}

export async function getSpotifyNowPlaying(): Promise<SpotifyInternalResponse> {
  const trackInfo = await nowPlaying()

  if (!trackInfo.item) {
    return { isPlaying: false }
  }

  return {
    artist: trackInfo.item.artists[0].name,
    artistLink: trackInfo.item.artists[0].external_urls.spotify,
    name: trackInfo.item.name,
    trackUrl: trackInfo.item.external_urls.spotify,
    albumImage: trackInfo.item.album.images[0].url,
    previewUrl: trackInfo.item.preview_url,
    duration: trackInfo.item.duration_ms,
    progress: trackInfo.progress_ms,
    isPlaying: true,
  }
}
