import './styles.css';

export const Classes = ({ classes }) => {
    return (
        <div>
            <form className='form-container'>
                <label htmlFor='name'>Nome do Aula:</label>
                <input type='text' id='name' />
                <button className='register-button-container'>Cadastrar</button>
            </form>
            <ul>
                {classes?.map((item) => <li className='list-item' key={item?.id}>{item?.name}</li>)}
            </ul>
        </div>
    );

};