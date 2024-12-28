import { Link } from 'react-router-dom';
import './styles.css';
import { useState } from 'react';
import { useEffect } from 'react';


export const StudentsList = ({ }) => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        type_license: ''
    });

    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        try {
            const response = await fetch('http://localhost:5000/students');
            const data = await response.json();
            console.log("data", data);
            setStudents(data);
        } catch (error) {
            console.error("Erro ao buscar alunos", error);
        }
    };

    const updateForm = (e) => {
        const { id, value } = e?.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e?.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response) {
                alert("Aluno cadastrado com sucesso");
                setFormData({ name: '', type_license: '' });
                getStudents();
            }

        } catch (error) {
            console.error('Erro no cadastro', error);
        }
    };

    return (
        <div>
            <form className='form-container' onSubmit={handleSubmit}>
                <label htmlFor='name'>Nome do Aluno:</label>
                <input type='text' id='name' value={formData?.name} onChange={updateForm} />
                <label htmlFor='type_license'>Tipo de carteira:</label>
                <input type='text' id='type_license' value={formData?.type_license} onChange={updateForm} />
                <button type='submit' className='register-button-container'>Cadastrar</button>
            </form>

            <table className="students-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Tipo de Carteira</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr className='list-item' key={student.id}>
                            <td><Link to={`/students/:${student?.id}`}> {student?.name}</Link></td>
                            <td>{student?.type_license}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};
