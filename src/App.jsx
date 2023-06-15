import './App.css';
import Dindin from "./Images/Logo.svg";
import ProfilePicutre from "./Images/1814089_account_user_person_profile_avatar_icon 1.svg"
import ExitButton from "./Images/Vector.svg"
import Filter from "./Images/icons8-filtro-48 1.svg"
import Edit from "./Images/icons8-editar 1.svg"
import Delete from "./Images/icons8-lixo 1.svg"
import CloseButton from "./Images/Group 1647.svg"
import React,{ useState } from 'react';
function App() {
  const [addReg,setaddReg] = useState(false)
  const [editReg,setEditReg] = useState(false);
  const [userName,setUserName] = useState("Lucas")
  const [promisses,setPromisses] =  useState([])
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tipoTransacao,setTipoTransacao] = useState("Saida");
  const [registroAtual, setRegistroAtual] = useState(null);
  const [tipoTransacaoRegistro, setTipoTransacaoRegistro] = useState(registroAtual?.tipoTransacao || 'Saida');
  const transacoesEntrada = promisses.filter(promiss => promiss.tipoTransacao === "Entrada");
  const totalEntradas = transacoesEntrada.reduce((total, promiss) => total + promiss.Valor, 0);
  const transacoesSaida = promisses.filter(promiss => promiss.tipoTransacao === "Saida");
  const totalSaida = transacoesSaida.reduce((total, promiss) => total + promiss.Valor, 0);
  const saldo = totalEntradas - totalSaida;
  let count = 0;

  function handleAddOpenAddReg() {
    setaddReg(!addReg)
    setValor('');
    setCategoria('');
    setData('');
    setDescricao('');
    setTipoTransacao("Saida")
    
  }

function handleAddOpenEditReg() {
  setEditReg(!editReg)
}

const handleConfirmar = () => {
const dataSelecionada = new Date(data); 
const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const diaDaSemana = diasDaSemana[dataSelecionada.getDay()+1];
const novaPromessa = {
    data: data,
    semana: diaDaSemana, 
    descricao: descricao,
    Categoria: categoria,
    tipoTransacao,
    Valor: parseFloat(valor),
  };
  setPromisses([...promisses, novaPromessa]);
  setValor('');
  setCategoria('');
  setData('');
  setDescricao('');
  setTipoTransacao("Saida")
  setaddReg(!addReg)
};


 
  const handleDeletePromessa = (index) => {
    const updatedPromisses = [...promisses]; 
    updatedPromisses.splice(index, 1);
    setPromisses(updatedPromisses);
  };

  const handleEditPromessa = (index,promiss) => {
    setRegistroAtual({
      index: index,
      data: promiss.data,
      semana: promiss.semana,
      descricao: promiss.descricao,
      Categoria: promiss.Categoria,
      tipoTransacao: promiss.tipoTransacao,
      Valor: promiss.Valor
    });
    
 
    setEditReg(!editReg);
  };

  const handleAtualizar = (promessaAtualizada) => {
    const dataSelecionada = new Date(promessaAtualizada.data);
    const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const diaDaSemana = diasDaSemana[dataSelecionada.getDay() + 1];
    const novaPromessa = {
      data: registroAtual.data,
      semana: diaDaSemana,
      descricao: registroAtual.descricao,
      Categoria: registroAtual.Categoria,
      tipoTransacao: registroAtual.tipoTransacao,
      Valor: parseFloat(registroAtual.Valor),
    };
    const promissesAtualizadas = [...promisses];
    promissesAtualizadas[registroAtual.index] = novaPromessa;
    setPromisses(promissesAtualizadas);
    setEditReg(!editReg);
  };
  
  
  const handleTipoTransacao = (value) => {
    setTipoTransacaoRegistro(value);
    setRegistroAtual({ ...registroAtual, tipoTransacao: value });
  };
  
  
  return (
    <div className='app'>
      <div  className="container">
      <header>
        <img src={Dindin} alt='Dindin Logo'></img>
        <div className='profile'>
        <img src={ProfilePicutre} alt="Profile" style={{cursor:"pointer"}}></img>
        <span>{userName}</span>
        <img src={ExitButton} alt='Exit Button'></img>
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
    {promisses.map((promiss, index) => {
          count++;
          return (
            <React.Fragment key={index}>
              <div className="grid-item">{promiss.data}</div>
              <div className="grid-item">{promiss.semana}</div>  
              <div className="grid-item">{promiss.descricao}</div> 
              <div className="grid-item">{promiss.Categoria}</div>
              <div className={promiss.tipoTransacao ==="Saida" ? "grid-item orange": "grid-item purple" }><strong>{`R$ ${promiss.Valor.toFixed(2)}`}</strong></div>
              <div className="grid-item btn">
          <img src={Edit} alt='Edit Button'  onClick={() => handleEditPromessa(index,promiss)}></img>
          <img src={Delete} alt='Delete Button' onClick={() => handleDeletePromessa(index)}></img>
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
        <span className='purple'>{`R$ ${totalEntradas.toFixed(2)}`}</span>
        </div>
        <div className='exit'>
        <strong>Saídas</strong>
        <span className='orange'>{`R$ ${totalSaida.toFixed(2)}`}</span>
        </div>
        <div className='balance1'> 
        <h3>Saldo</h3>
        <span className='blue'>{`R$ ${saldo.toFixed(2)}`}</span>
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
          <form>
        <div className='buttons'>
          <button className= {tipoTransacao === "Entrada" ? 'button blue-bc': "button"} type='button' onClick={e=>setTipoTransacao("Entrada")}>Entrada</button>
          <button className= {tipoTransacao === "Saida" ? 'button red-bc': "button"} type='button' onClick={e=>setTipoTransacao("Saida")}>Saída</button>
        </div>
        <div className='value'>
          <h3>Valor</h3>
          <input type='text' value={valor} onChange={e => setValor(e.target.value)} />
        </div>
        <div className='category'>
          <h3>Categoria</h3>
          <select value={categoria} onChange={e => setCategoria(e.target.value)}>
            <option></option>
            <option>Alimentação</option>
            <option>Assinaturas e Serviços</option>
            <option>Casa</option>
            <option>Compras</option>
            <option>Cuidados pessoais</option>
            <option>Educação</option>
          </select>
        </div>
        <div className='calendar'>
          <h3>Data</h3>
          <input type='date' value={data} onChange={e => setData(e.target.value)} />
        </div>
        <div className='description'>
          <h3>Descrição</h3>
          <input type='text' value={descricao} onChange={e => setDescricao(e.target.value)} />
        </div>
        <div>
          <button className='button purple-bc' type='button' onClick={handleConfirmar}>Confirmar</button>
        </div>
      </form>
      </div>}



            {/* editar Registro */}      
  { editReg &&  registroAtual &&  <div className='add-reg'>
        <div className='close-button'>
        <h2>Editar Registro</h2>
        <img src={CloseButton} alt='Close Button' onClick={()=>handleAddOpenEditReg()}></img>
          </div>
          <form>
        <div className='buttons'>
          <button className= {tipoTransacaoRegistro === "Entrada" ? 'button blue-bc': "button"} type='button' onClick={() => handleTipoTransacao('Entrada')}>Entrada</button>
          <button className= {tipoTransacaoRegistro === "Saida" ? 'button red-bc': "button"} type='button' onClick={() => handleTipoTransacao('Saida')}>Saída</button>
        </div>
        <div className='value'>
          <h3>Valor</h3>
          <input type='text' value={registroAtual.Valor} onChange={e => setRegistroAtual({ ...registroAtual, Valor: e.target.value })} />
        </div>
        <div className='category'>
          <h3>Categoria</h3>
          <select value={registroAtual.Categoria} onChange={e => setRegistroAtual({ ...registroAtual, Categoria: e.target.value })}>
            <option></option>
            <option>Alimentação</option>
            <option>Assinaturas e Serviços</option>
            <option>Casa</option>
            <option>Compras</option>
            <option>Cuidados pessoais</option>
            <option>Educação</option>
          </select>
        </div>
        <div className='calendar'>
          <h3>Data</h3>
          <input type='date' value={registroAtual.data} onChange={e => setRegistroAtual({ ...registroAtual, data: e.target.value })} />
        </div>
        <div className='description'>
          <h3>Descrição</h3>
          <input type='text' value={registroAtual.descricao} onChange={e => setRegistroAtual({ ...registroAtual, descricao: e.target.value })} />
        </div>
        <div>
          <button className='button purple-bc' type='button'  onClick={() => handleAtualizar(registroAtual)}>Confirmar</button>
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

export default App;
