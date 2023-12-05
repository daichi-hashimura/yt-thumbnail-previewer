import { useCallback, useState } from "react"
import LogoAsset from "../public/thumbnail-preview.svg"
import "./App.css"
import { useModal } from "./hooks/useModal"

const THUMBNAIL_IMAGE_TYPES = [
  "maxresdefault",
  "sddefault",
  "hqdefault",
  "mqdefault",
  "default",
] as const
const thumnailImages = {
  maxresdefault: "1280 x 720",
  sddefault: "640 x 480",
  hqdefault: "480 x 360",
  mqdefault: "320 x 180",
  default: "120 x 90",
}

const App = () => {
  const [videoId, setVideoId] = useState<string | null>(null)

  const { renderModal, toggleModal } = useModal()

  const onInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.currentTarget.value.includes("youtube")
      ? e.currentTarget.value.split("/")[
          e.currentTarget.value.split("/").length - 1
        ]
      : e.currentTarget.value
    setVideoId(id)
  }, [])

  const openFullScreen = (e: React.MouseEvent<HTMLImageElement>) => {
    const imageElement = e.currentTarget

    if (imageElement) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        imageElement.requestFullscreen().catch((err) => {
          console.error("Error attempting to enable fullscreen:", err)
        })
      }
    }
  }

  return (
    <>
      <h1>
        <img src={LogoAsset} alt="Logo" width="50" />
        YT Thumbnail Previewer
      </h1>

      <label>
        <span>
          Youtube動画URLまたはYoutube動画idを入力してthumbnail画像を確認する
        </span>
        <input
          type="text"
          placeholder="Youtube videoのURLを入力してください"
          onInput={onInput}
        />
      </label>

      {videoId && (
        <>
          <p>
            <span style={{ fontWeight: "bold" }}>Youtube Video ID:</span>
            {videoId}
          </p>

          <button onClick={toggleModal}>Videoを再生する</button>

          <section>
            <h2>画像が表示されない場合:</h2>
            <ul className="noticeList">
              <li>
                <small>
                  ※ 入力されたYoutube動画URLまたはYoutube動画IDに誤りがある
                </small>
              </li>
              <li>
                <small>
                  ※
                  解像度の低い画像がYoutubeにアップロードされている可能性がありますため、Youtubeを確認し、解像度の高いサムネイル画像を再度アップロードしてください
                </small>
              </li>
              <li>
                <small>
                  ※ Youtube動画のVisibilityがPrivateとして設定されている
                </small>
              </li>
            </ul>
          </section>

          <ul className="imageList">
            {THUMBNAIL_IMAGE_TYPES.map((imageType, i) => (
              <li key={`${imageType}-${i}`} className="imageItem">
                <figure>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/${imageType}.jpg`}
                    alt=""
                    onClick={openFullScreen}
                    title="Fullscreenで画像を確認する"
                  />
                  <figcaption>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Thumbnail Image type:
                      </span>{" "}
                      {imageType}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>
                        Thumbnail size:
                      </span>{" "}
                      {thumnailImages[imageType]}
                    </p>
                    <a
                      target="_blank"
                      href={`https://img.youtube.com/vi/${videoId}/${imageType}.jpg`}
                    >
                      別タブで画像を開く
                    </a>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </>
      )}

      {renderModal({
        modalContent: (
          <div>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              allowFullScreen
            />
          </div>
        ),
      })}
    </>
  )
}

export default App
