
export const IndividualStatusTable = ({ classes, students }) => {
    return (
        <div>
            <h1>{students?.name}</h1>
            <table>
                <thead>
                    <tr>
                        <th>Aulas</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {classes?.map((item, index) => (
                        <tr key={index}>
                            <td>{item?.name}</td>
                            <td>{item?.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};