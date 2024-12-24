import { Link } from 'react-router-dom';
import './styles.css';

export const StudentsList = ({ students }) => {

    return (
        <div>
            <form className='form-container'>
                <label htmlFor='name'>Nome do Aluno:</label>
                <input type='text' id='name' />
                <label htmlFor='type-license'>Tipo de carteira:</label>
                <input type='text' id='type-license' />
                <button className='register-button-container'>Cadastrar</button>
            </form>
            <ol>
                {students?.map((item) => (
                    <li className='list-item' key={item?.id}>
                        <Link to={`students/${item?.id}`}> {item?.name}</Link>
                    </li>
                ))}
            </ol>
        </div>
    );
};
