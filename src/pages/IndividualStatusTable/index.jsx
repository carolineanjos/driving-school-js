import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const IndividualStatusTable = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [availableClasses, setAvailableClasses] = useState([]);
    const [associatedClasses, setAssociatedClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');

    useEffect(() => {
        if (!studentId) return;

        const fetchStudentDetails = async () => {
            try {
                const cleanStudentId = studentId.replace(":", "");

                const response = await fetch(`http://localhost:5000/students/${cleanStudentId}`);

                if (!response.ok) {
                    throw new Error('Erro ao buscar detalhes do estudante');
                }

                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Erro ao buscar detalhes do estudante:', error);
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    useEffect(() => {
        const fetchAvailableClasses = async () => {
            try {
                const res = await fetch('http://localhost:5000/classes');
                const data = await res.json();
                setAvailableClasses(data);
            } catch (error) {
                console.error('Erro ao buscar aulas disponíveis:', error);
            }
        };

        fetchAvailableClasses();
    }, []);



    const fetchAssociatedClasses = async () => {
        try {
            const cleanStudentId = studentId.replace(":", "");
            const res = await fetch(`http://localhost:5000/students/${cleanStudentId}/classes`);

            if (!res.ok) {
                throw new Error('Erro ao buscar aulas associadas');
            }

            const data = await res.json();
            setAssociatedClasses(data);
        } catch (error) {
            console.error('Erro ao buscar aulas associadas:', error);
        }
    };
    useEffect(() => {
        if (!studentId) return;

        const fetchData = async () => {
            await fetchAssociatedClasses();
        };

        fetchData();
    }, [studentId]);

    const handleAddClass = async () => {
        if (!selectedClass) return;

        try {
            const cleanStudentId = studentId.replace(":", "");
            const res = await fetch(`http://localhost:5000/students/${cleanStudentId}/classes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ classId: selectedClass }),
            });

            if (res.ok) {
                await fetchAssociatedClasses();

                setSelectedClass('');
            } else {
                console.error('Erro ao adicionar aula:', await res.text());
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    const handleStatusChange = async (classId, newStatus) => {
        try {
            const cleanStudentId = studentId.replace(":", "");
            const res = await fetch(`http://localhost:5000/students/${cleanStudentId}/classes/${classId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                const updatedClass = await res.json();
                setAssociatedClasses((prev) =>
                    prev.map((item) => (item.class_id === classId ? updatedClass : item))
                );
            } else {
                console.error('Erro ao atualizar status:', await res.text());
            }
        } catch (error) {
            console.error('Erro de rede:', error);
        }
    };

    return (
        <div>
            <h1>{student?.name}</h1>
            <div>
                <h3>Adicionar Aula</h3>
                <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                >
                    <option value="">Selecione uma aula</option>
                    {availableClasses.map((cls) => (
                        <option key={cls.id} value={cls.id}>
                            {cls.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleAddClass}>Adicionar</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Aulas</th>
                        <th>Status</th>
                        <th>Atualizar Status</th>
                    </tr>
                </thead>
                <tbody>
                    {associatedClasses.map((cls, index) => {
                        const getName = availableClasses.find((c) => c.id === Number(cls.class_id))?.name || 'Aula não encontrada';
                        return (
                            <tr key={index}>
                                <td>{getName}</td>
                                <td>{cls.status}</td>
                                <td>
                                    <select
                                        value={cls.status}
                                        onChange={(e) => handleStatusChange(cls?.class_id, e.target.value)}
                                    >
                                        <option value="Não Iniciado">Não Iniciado</option>
                                        <option value="Iniciado">Iniciado</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </td>
                            </tr>

                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
