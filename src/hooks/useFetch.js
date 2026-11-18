import { useState, useEffect } from 'react';
import axios from 'axios';

// Fetches a url and reports three things back: the data, whether it is still
// loading, and whether it failed. It runs again whenever the url changes.
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // No url means there is nothing to ask for yet, so clear out and stop.
        if (!url) {
            setData(null);
            setError(null);
            setLoading(false);
            return undefined;
        }

        // Lets us cancel this request if the url changes before the answer
        // arrives. Without it a slow old reply can land after a fast new one
        // and overwrite it with the wrong data.
        const controller = new AbortController();

        setLoading(true);
        setError(null);

        axios
            .get(url, { signal: controller.signal })
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                // We cancelled it on purpose, so this is not a real failure.
                if (axios.isCancel(err) || err.name === 'CanceledError') {
                    return;
                }
                setError(err);
                setLoading(false);
            });

        return () => controller.abort();
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
