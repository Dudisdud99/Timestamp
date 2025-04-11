class Timestamp {

    constructor() {
        this.convertMinToMs = 60 * 1000;
        this.convertHourToMs = 60 * this.convertMinToMs;
    }

    calcDiff(req, res) {
        console.log("calc")
        const date1 = req.params.date1;
        const date2 = req.params.date2;

        const d1 = new Date(date1);
        const d2 = new Date(date2);

        if (d1.getTime() && d2.getTime()) {
            const diffInMs = Math.abs(d2.getTime() - d1.getTime());

            const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
            const remainingMsAfterDays = diffInMs % (1000 * 60 * 60 * 24);

            const diffInHours = Math.floor(remainingMsAfterDays / (1000 * 60 * 60));
            const remainingMsAfterHours = remainingMsAfterDays % (1000 * 60 * 60);

            const diffInMinutes = Math.floor(remainingMsAfterHours / (1000 * 60));
            const remainingMsAfterMinutes = remainingMsAfterHours % (1000 * 60);

            const diffInSeconds = Math.floor(remainingMsAfterMinutes / 1000);
            const remainingMsAfterSeconds = remainingMsAfterMinutes % 1000;

            res.json({
                message: 'Diferença entre datas',
                dates: { data1: date1, data2: date2 },
                diferencaEmDias: diffInDays,
                diferencaEmHoras: diffInHours,
                diferencaEmMinutos: diffInMinutes,
                diferencaEmSegundos: diffInSeconds,
                diferencaEmMilissegundos: remainingMsAfterSeconds
            });
        }
        else{
            return res.status(400).json({ error: 'Invalid Date' });
        }
    }

    getTimestamp(req, res) {
        const d = new Date();
        
        let dateUnix = this.toUnix(d);
        let dateUTC = this.toUTC(d);

        return res.json(
            { message: 'Timestamp',
            'date': {
                unix: dateUnix,
                utc: dateUTC 
            }});
    }

    toUnix(d) {
        const  unixTimetamp = d.getTime();
        return unixTimetamp; 
    }

    toUTC(d) {
        const utcTimestamp = d.toUTCString();
        return utcTimestamp;
    }

    inputDate(req, res) {
        console.log("input")
        console.log(req.params)

        const dateParam = req.params.date;
        const timeZone = req.query.timeZone;

        const match = dateParam.match(/([+-]\d{2})$/);
        let offsetMs = timeZone ? -timeZone * this.convertHourToMs : 0;
        if (match) {
            let offset = match[1];
            offsetMs = offset * this.convertHourToMs;
        }

        const d = new Date(dateParam);

        if (d.getTime()) {
            const dateUnix = this.toUnix(d) + offsetMs;
            const dateUnixObj = new Date(dateUnix);
            const dateUTC = this.toUTC(dateUnixObj);

            res.json({ message: 'Timestamp', 'date': {unix: dateUnix, utc: dateUTC }});
        }
        else{
            return res.status(400).json({ error: 'Invalid Date' });
        }
    }

    getTimeZone (req, res){
        const timeZone = req.params.timeZone;

    }
}

module.exports = Timestamp;
