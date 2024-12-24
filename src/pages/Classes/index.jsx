import './styles.css';

export const Classes = ({ classes }) => {
    <div>
        <button className='register-button-container'>Cadastro de Aulas</button>
        <ol>
            {classes?.map((item) => <li className='list-item'>{item?.description}</li>)}
        </ol>
    </div>;

};