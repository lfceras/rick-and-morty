import './modalDetails.css'

const ModalDetails = ({open, onClose, detalles}) => {
  
  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className="modal-content">
      <h1>{detalles.name}</h1>
        <h2>{detalles.species}</h2>
        <label>Género</label>
        <span>{detalles.gender}</span>
        <label>Estado</label>
        <span>{detalles.status}</span>
        <label>Origen</label>
        <span>{detalles.origin}</span>
        <label>Ubicación</label>
        <span>{detalles.location}</span>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  )
}

export default ModalDetails