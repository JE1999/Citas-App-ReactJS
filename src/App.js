import React, {useState, useEffect, Fragment} from 'react';

const purple = { background: "purple" }
const purpleText = { color: "rgba(126, 0, 114, .7)" }

function Cita({cita, index, eliminarCita}){
  return(
    <div className="uk-card uk-card-default uk-card-body uk-width-1-1@m mb-2">
      <div className="uk-card-badge uk-label" style={purple}>{cita.fecha} | {cita.hora}</div>
      <br/>
      <h3 className="uk-card-title"><span role="img" aria-label="leg">🐾</span> {cita.mascota}</h3>
      <hr/>
      <h6>Propietario:</h6>
      <p>{cita.propietario}</p>
      <h6>Sintomas:</h6>
      <p>{cita.sintomas}</p>
      <button 
        className="btn btn-sm text-white"
        style={purple}
        title="Eliminar"
        onClick={() => eliminarCita(index)}
      >X</button>
    </div>
  )
}

function Formulario({crearCita}){ 
  
  const stateInicial = {
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  }

  const [cita, actualizarCita] = useState(stateInicial)
  
  const actualizarState = e =>{

    actualizarCita({
      ...cita,
      [e.target.name] : e.target.value

    })

  }

  const enviarCita = e =>{

    e.preventDefault()

    const { mascota, propietario, fecha, hora, sintomas } = cita

    if(mascota && propietario && fecha && hora && sintomas){

      console.log(cita)
      crearCita(cita)

      actualizarCita({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
      })

      return
    
    }
    
    alert("Campos vacios")

  }

  return(
    <Fragment>
      <form
        className="shadow p-3 rounded"
        onSubmit={enviarCita}
      >

        <div className="form-group">
          <label>Mascota:</label>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre Mascota..."
              name="mascota"
              onChange={actualizarState}
              value={cita.mascota}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Propietario:</label>
          <div className="col-12">
            <input
              type="text"
              className="form-control"
              placeholder="Propietario..."
              name="propietario"
              onChange={actualizarState}
              value={cita.propietario}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Fecha:</label>
          <div className="col-12">
            <input
              type="date"
              className="form-control"
              name="fecha"
              onChange={actualizarState}
              value={cita.fecha}             
            />
          </div>
        </div>

        <div className="form-group">
          <label>Hora:</label>
          <div className="col-12">
            <input
              type="time"
              className="form-control"
              name="hora"
              onChange={actualizarState}
              value={cita.hora}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Sintomas:</label>
          <div className="col-12">
            <textarea 
              className="form-control"
              name="sintomas"
              placeholder="Sintomas que presenta..."
              onChange={actualizarState}
              value={cita.sintomas}
            >
            </textarea>
          </div>
        </div>
        
        <input type="submit" className="btn text-white btn-block" style={purple} value="Agregar"/>

      </form>
    </Fragment>
  )
}

function App() {

  let citasIniciales = JSON.parse(localStorage.getItem('citas'))

  if(!citasIniciales){
     
    citasIniciales=[]
    
  }
  
  const [citas, guardarCitas] = useState(citasIniciales)

  const crearCita = cita => {

    const nuevasCitas = [...citas, cita]
    console.log(nuevasCitas)

    guardarCitas(nuevasCitas)

  }

  const eliminarCita = index =>{

    const nuevasCitas = [...citas]
    nuevasCitas.splice(index, 1)
    guardarCitas(nuevasCitas)
    
  }

  //LocalStorage
  useEffect(() => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'))

    if(citasIniciales){
     
      localStorage.setItem('citas', JSON.stringify(citas))
    
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  
  }, [citas])

  const titulo = Object.keys(citas).length === 0 ? 'No hay citas' : 'Lista de citas'
  
  return (
    <Fragment>
      <nav className="navbar" style={purple}>
        <span className="navbar-brand mb-0 h1 text-white">Administrador de pacientes <span role="img" aria-label="dog & cat">🐶 🐈</span></span>
      </nav>
      <div className="container">
        <div className="row">
        <div className="col-sm-12 col-md-5 m-3 p-2">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="col-sm-12 col-md-5 m-3">
            <h2 style={purpleText}>{titulo}</h2>
            {citas.map((cita, index) => (
              <Cita
                key={index}
                index={index}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
