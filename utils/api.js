export async function fetchData(filters) {
    const { limit = 10, order_by = '', sort_order = 'DESC', trip_date_before = '', trip_date_after = '' } = filters ?? {};
    const token = 'p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c';
    const limitParam = limit ? `+LIMIT+${limit}` : '';
    const orderByParam = order_by ? `+ORDER+BY+${order_by}+${sort_order ? sort_order : 'DESC'}` : '';
    const beforeDateParam = trip_date_before ? `+WHERE+tpep_pickup_datetime+<+'${trip_date_before.split('T')[0]}'`: '';
    const afterDateParam = trip_date_after ? `+WHERE+tpep_pickup_datetime+>+'${trip_date_after.split('T')[0]}'`: '';
    const q = `SELECT+tpep_pickup_datetime,trip_distance,passenger_count,payment_type,tip_amount,total_amount+FROM+_${encodeURI(beforeDateParam)}${encodeURI(afterDateParam)}${orderByParam}${limitParam}`;
    const url = new URL(`https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?token=${token}&q=${q}`);

    try {
        const result = await fetch(url)
            .then(r => r.json())
            .then(r => r)
            .catch(e => e.toString())

        if (!result.data) {
            const msg = `there is a problem running the query: ${result.error}`;
            console.error(msg);
            window.alert(msg)
        } else {
            return result.data;
        }
    } catch(err) {
        console.error('Error: ', err);
        window.alert(err)
    }
}