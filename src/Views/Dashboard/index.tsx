import './App.css';
import Dindin from "../../Images/Logo.svg";
import ProfilePicutre from "../../Images/1814089_account_user_person_profile_avatar_icon 1.svg"
import ExitButton from "../../Images/Vector.svg"
import Filter from "../../Images/icons8-filtro-48 1.svg"
import Edit from "../../Images/icons8-editar 1.svg"
import Delete from "../../Images/icons8-lixo 1.svg"
import CloseButton from "../../Images/Group 1647.svg"
import React,{ useEffect, useState } from 'react';
import { useAuth} from '../../Contexts/AuthContext';
import { api } from "../../services/api";
import { format } from 'date-fns';


function Dashboard() {
  const { user, signOut } = useAuth();
  const [addReg,setaddReg] = useState(false)
  const [editReg,setEditReg] = useState(false);
  const [subCategoria, setSubCategoria] = useState([]);
  const [todasTransacos,setTodasTransacos] = useState([]);
  const [entrada,setEntrada] = useState();
const [saida,setSaida] = useState();
const [saldo,setSaldo] = useState();
  const [formDados, setFormDados] = useState({
    "tipo":"saida",
    "descricao":"",
    "valor":"",
    "data":"",
    "categoria_id":""
  });
  let count = 0;
  
 

  function handleAddOpenAddReg() {
    setaddReg(!addReg)
 
  }
  const [editando,setEditando] = useState([]);
  function handleEdit(objeto) {
    setEditando(objeto)
  
  
  setEditReg(!editReg)
}

function handleAddOpenEditReg() {
  setEditReg(!editReg)
}
    
  const handleChange = (event) => {
    setFormDados({
      ...formDados,
      [event.target.name]: event.target.value
    });
  };

  const handleChange2 = (event) => {
    
    if (event.target.name === 'data') {
      const date = new Date(event.target.value);
      const formattedDate = format(date, 'yyyy-MM-dd');
      setEditando({
        ...editando,
        [event.target.name]: formattedDate
      });
    } else {
      setEditando({
        ...editando,
        [event.target.name]: event.target.value
      });
    }
  };
  
  
  const handleButtonClick = (tipo) => {
    setFormDados({
      ...formDados,
      tipo: tipo
    });
  };

  const handleButtonClick2 = (tipo) => {
    setEditando({
      ...editando,
      tipo: tipo
    });
  };


  useEffect(() => {
    api.get('/categoria')
      .then(response => {
        setSubCategoria(response.data);
        
        
      })

      api.get("/transacao")
      .then(response=>{
        setTodasTransacos(response.data)
        
      })
      
      
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
   await api.post("/transacao",formDados)
  .then(response=>{
    window.location.reload();
    setaddReg(!addReg);
  }).catch(error=>{
    return alert(error.response.data.mensagem)
  })
     
    
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    const esseID = editando.id;
   await api.put(`/transacao/${esseID}`,editando)
  .then(response=>{
    window.location.reload();
    setaddReg(!addReg);
  }).catch(error=>{
    return alert(error.response.data.mensagem)
  })
     
    
  };

  const handleDelete = async (meuid)=>{
    await api.delete( `/transacao/${meuid}`)
    try {
      window.location.reload();
    } catch (error) {
      alert('Erro ao enviar requisição:', error);
    }
  }


  const handleExtrato = async ()=>{
    await api.get("/transacao/extrato")
    .then(response=>{
      setEntrada(response.data.entrada.toFixed(2));
      setSaida(response.data.saida.toFixed(2))
      setSaldo((Number(response.data.entrada.toFixed(2))+ Number(response.data.saida.toFixed(2))).toFixed(2))
    })

  }
  handleExtrato()

  function getDiaDaSemana(data) {
    const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const dia = new Date(data).getDay();
    return diasSemana[dia+1];
  }

 
  
  

  
  
  return (
    <div className='app'>
      <div  className="container">
      <header>
        <img src={Dindin} alt='Dindin Logo'></img>
        <div className='profile'>
        <img src={ProfilePicutre} alt="Profile" style={{cursor:"pointer"}}></img>
        <span>{user?.nome}</span>
        <img src={ExitButton} alt='Exit Button' onClick={signOut} style={{cursor:'pointer'}}></img>
        </div>
      </header>
      
      <div className='container-table'>
        <div className='grid-container'>
        <div className='grid-item'>  
        <button className='filter'>
            <img src={Filter} alt='Botão de filtro'></img>
            <span>Filtrar</span>
        </button>
        </div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
    <div className="grid-item"><strong>Data</strong></div>
    <div className="grid-item"><strong>Dia da semana</strong></div>
    <div className="grid-item"><strong>Descrição</strong></div>
    <div className="grid-item"><strong>Categoria</strong></div>
    <div className="grid-item"><strong>Valor</strong></div>
    <div className="grid-item"></div>
   { todasTransacos.map((transacoes, index) => {
          count++;
          return (
            <React.Fragment key={transacoes.id}>
          
              <div className="grid-item">{`${transacoes.data[8]}${transacoes.data[9]}/${transacoes.data[5]}${transacoes.data[6]}/${transacoes.data[2]}${transacoes.data[3]}`}</div>
              <div className="grid-item">{getDiaDaSemana(transacoes.data)}</div>  
              <div className="grid-item">{transacoes.descricao}</div> 
              <div className="grid-item">{transacoes.categoria_nome}</div>
              <div className={transacoes.tipo ==="saida" ? "grid-item orange": "grid-item purple" }><strong>{`R$ ${transacoes.valor.toFixed(2)}`}</strong></div>
              <div className="grid-item btn">
          <img src={Edit} alt='Edit Button'  onClick={() => handleEdit(transacoes)}></img>
          <img src={Delete} alt='Delete Button' onClick={()=>handleDelete(transacoes.id)}></img>
        </div> 
              
            </React.Fragment>
          );
        })} 
   
  </div>
        <div className='right'>
      <div className='balance'>
        <h2>Resumo</h2>
        <div className='entry'>
        <strong>Entradas</strong>
        <span className='purple'>{`R$ ${entrada}`}</span>
        </div>
        <div className='exit'>
        <strong>Saídas</strong>
        <span className='orange'>{`R$ ${saida}`}</span>
        </div>
        <div className='balance1'> 
        <h3>Saldo</h3>
        <span className='blue'>{`R$ ${saldo}`}</span>
        </div>
        </div>
        <button className='btn-add' onClick={()=>handleAddOpenAddReg()}>Adicionar Registro</button>
      </div>
      </div>

      {/* adicionar registro */}      
  { addReg &&   <div className='add-reg'>
        <div className='close-button'>
        <h2>Adicionar Registro</h2>
        <img src={CloseButton} alt='Close Button' onClick={()=>handleAddOpenAddReg()}></img>
          </div>
          <form onSubmit={handleSubmit}>
        <div className='buttons'>
          <button className= {formDados.tipo === "entrada" ? 'button blue-bc': "button"} value={formDados.tipo} type='button' onClick={() => handleButtonClick('entrada')}>Entrada</button>
          <button className= {formDados.tipo === "saida" ? 'button red-bc': "button"} value={formDados.tipo} type='button' onClick={() => handleButtonClick('saida')}>Saída</button>
        </div>
        <div className='value'>
          <h3>Valor</h3>
          <input type='text' name='valor' value={formDados.valor} onChange={handleChange} />
        </div>
        <div className='category'>
          <h3>Categoria</h3>
          <select value={formDados.categoria_id} name='categoria_id' onChange={handleChange}>
          <option></option>
          {subCategoria.map(objeto => (
        <option key={objeto.id} value={objeto.id}>{objeto.descricao}</option>
      ))}

          </select>
        </div>
        <div className='calendar'>
          <h3>Data</h3>
          <input type='date' name='data' value={formDados.data} onChange={handleChange} />
        </div>
        <div className='description'>
          <h3>Descrição</h3>
          <input type='text' name='descricao' value={formDados.descricao} onChange={handleChange} />
        </div>
        <div>
          <button className='button purple-bc' type='submit'>Confirmar</button>
        </div>
      </form>
      </div>}



            {/* editar Registro */}      
  { editReg && <div className='add-reg'>
        <div className='close-button'>
        <h2>Editar Registro</h2>
        <img src={CloseButton} alt='Close Button' onClick={()=>handleAddOpenEditReg()}></img>
          </div>
          <form onSubmit={handleSubmit2}>
        <div className='buttons'>
          <button className= {editando.tipo === "entrada" ? 'button blue-bc': "button"} value={editando.tipo} type='button' onClick={() => handleButtonClick2('entrada')}>Entrada</button>
          
          <button className= {editando.tipo === "saida" ? 'button red-bc': "button"} value={editando.tipo} type='button' onClick={() => handleButtonClick2('saida')}>Saída</button>
        </div>
        <div className='value'>
          <h3>Valor</h3>
          <input type='text' name='valor' value={editando.valor} onChange={handleChange2} />
        </div>
        <div className='category'>
          <h3>Categoria</h3>
          <select value={editando.categoria_id} name='categoria_id' onChange={handleChange2}>
          <option></option>
          <option key={editando.id}> {editando.categoria_nome}</option>
          {subCategoria.map(objeto => (
        <option key={objeto.id} value={objeto.id}>{objeto.descricao}</option>
      ))}

          </select>
        </div>
        <div className='calendar'>
          <h3>Data</h3>
          <input type='date' name='data' value={editando.data} onChange={handleChange2} />
        </div>
        <div className='description'>
          <h3>Descrição</h3>
          <input type='text' name='descricao' value={editando.descricao} onChange={handleChange2} />
        </div>
        <div>
          <button className='button purple-bc' type='submit'>Confirmar</button>
        </div>
      </form>
      </div>}

      

      <style>
        {`
          .container::before,
          .container::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1;
            visibility: ${addReg||editReg? 'visible' : 'hidden'};
          }
          .container::before {
            mix-blend-mode: darken;
          }
        `}
      </style>
      </div>
      
    </div>
  );
}

export default Dashboard;
