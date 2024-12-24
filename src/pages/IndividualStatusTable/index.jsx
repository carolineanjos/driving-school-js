
export const IndividualStatusTable = ({ classes, students }) => {
    return (
        <div>
            <h1>{students?.name}</h1>
            <table>
                <tr>
                    <th>Aulas</th>
                    <th>Status</th>
                </tr>
                <tr>
                    {classes?.map((item) => <td>{item}</td>)}
                </tr>
            </table>
        </div>
    );
};