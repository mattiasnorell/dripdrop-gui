export class HttpFactory {
    public async $get<T>(url: string): Promise<T> {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        });

        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        }

        return <T>{};
    }

    public async $post<T>(url: string, data: unknown): Promise<T> {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });

        if (response.status >= 200 && response.status <= 299) {
            return response.json();
        }

        return <T>{};
    }
}
