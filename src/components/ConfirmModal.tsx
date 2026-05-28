type ConfirmModalProps = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function ConfirmModal({ title, message, onCancel, onConfirm }: ConfirmModalProps) {
  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
        <h2 id="confirm-title">{title}</h2>
        <p>{message}</p>
        <div className="modal__actions">
          <button className="button button--ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button className="button" type="button" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
