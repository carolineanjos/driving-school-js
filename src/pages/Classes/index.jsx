import { useEffect, useState } from 'react';
import './styles.css';

export const Classes = ({ }) => {
    const [classes, setClasses] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        type: '',
    });

    useEffect(() => {
        getClasses();
    }, []);

    const getClasses = async () => {
        try {
            const response = await fetch('http://localhost:5000/classes');
            const data = await response.json();
            setClasses(data);
        } catch (error) {
            console.error("Erro ao buscar aulas", error);
        }
    };

    const updateForm = (e) => {
        const { id, value } = e?.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response) {
                alert('Aula cadastrada com sucesso');
                setFormData({ name: '', type: '' });
                getClasses();
            }
        } catch (error) {
            console.error('Erro no cadastro', error);
        }
    };

    return (
        <div>
            <form className='form-container' onSubmit={handleSubmit}>
                <label htmlFor='name'>Nome do Aula:</label>
                <input type='text' id='name' value={formData?.name} onChange={updateForm} />
                <label htmlFor='type'>Aula de moto, carro ou os dois?</label>
                <input type='text' id='type' value={formData?.type} onChange={updateForm} />
                <button type='submit' className='register-button-container'>Cadastrar</button>
            </form>
            <table className="class-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Aula direcionada à</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((item) => (
                        <tr className='list-item' key={item.id}>
                            <td>{item?.name}</td>
                            <td>{item?.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );

};