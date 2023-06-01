import HelpmateProblem from './problem'
import { useEffect, useState } from 'react';


const TodayProblem = () => {
    const todayString = new Date().toISOString().slice(0, 10);
    const todayProblemUrl = `https://raw.githubusercontent.com/R-Peleg/daily-helpmate/main/problems/${todayString}.json`

    const [problemJson, setProblemJson] = useState(null);
    const [status, setStatus] = useState('request');

    useEffect(() => {
        if (!problemJson) {
            fetch(todayProblemUrl)
                .then(response => response.json())
                .then(json => {
                    setProblemJson(json);
                    setStatus('success');
                })
        }
    }, [problemJson, todayProblemUrl])

    // Bridge FEN format
    if (problemJson && problemJson.fen.split(' ').length === 1) {
        const color = Number.isInteger(problemJson.moves) ? 'b' : 'w';
        problemJson.fen = problemJson.fen + ' ' + color + ' - - 0 1';
    }

    return <>
        {problemJson && <HelpmateProblem
            initialFen={problemJson.fen}
            moveCount={problemJson.moves * 2}
            solutions={problemJson.solutions}
            variants={problemJson.variants}
            author={problemJson.author}
            year={problemJson.year} />}
    </>
}

export default TodayProblem;
