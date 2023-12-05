import { useCallback, ReactNode, useState } from "react"
import ReactModal from "react-modal"
import styles from "./modal.module.css"

type Options = { modalContent: ReactNode }

export const useModal = () => {
  ReactModal.setAppElement("body")
  const [showModal, setShowModal] = useState(false)

  const toggleModal = useCallback(() => {
    setShowModal((v) => !v)
  }, [])

  const renderModal = useCallback(
    ({ modalContent }: Options) => {
      return (
        <>
          <ReactModal
            isOpen={showModal}
            className={styles.modal}
            bodyOpenClassName={styles.modalParentBody}
            onRequestClose={toggleModal}
            shouldCloseOnOverlayClick
          >
            <div className={styles.modalContent}>
              <button
                onClick={toggleModal}
                aria-label="Close modal"
                title="Close modal"
              >
                X
              </button>
              {modalContent}
            </div>
          </ReactModal>
        </>
      )
    },
    [showModal, toggleModal]
  )

  return {
    renderModal,
    toggleModal,
  }
}
