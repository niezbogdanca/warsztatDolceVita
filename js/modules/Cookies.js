export class Cookies {

    // tworzenie pliku cookie
    // odczyt wartości z pliku cookie
    // usuwanie pliku cookie

    constructor() {
        this.checkCookieEnabled();
    }

    // sprawdzamy czy cookie jest włączone 
    checkCookieEnabled() {
        // skrótowa wersja if(navigator.cookieEnabled === false); wykrzyknik powoduje odwrócenie wartości
        if(!navigator.cookieEnabled) {
            alert('masz wylączoną obsługę cookies...');
            return;
        }

    }

    setCookie(options) {
        const optionsVal = {
            name: options.name || 'test',
            value: options.value || 'wartość testowa',
            days: options.days,
            domain: options.domain,
            path: options.path,
            secure: options.secure 
        }

        // stałe pośrednie sprawdzające obecność znaków specjalnych i spacji(usuwa je)
        const cookieName = encodeURIComponent(optionsVal.name);
        const cookieVal = encodeURIComponent(optionsVal.value);

        // optymalizacja kodu aby nie działać na stringach
        const cookieSettingsTab = [];

        cookieSettingsTab.push(`${cookieName} = ${cookieVal}`);

        // używamy typeof aby sprawdzić czy jest to napewno number
        if(typeof options.days === 'number'){

            const date = new Date();

            date.setTime(date.getTime() + (options.days * 24 * 3600 * 1000));

            cookieSettingsTab.push(`expires = ${date.toGMTString()}`)

        }

        if(optionsVal.domain){
            cookieSettingsTab.push(`domain=${optionsVal.domain}`)
        }

        if(optionsVal.path){
            cookieSettingsTab.push(`path=${optionsVal.path}`)
        }
        
        // sprawdzanie czy jest true lub false(gdy ktos poda inna wartość niż true lub false skrypt ustawi secure na wartość domyślną)
        if(optionsVal.secure && typeof optionsVal.secure == 'boolean'){
            cookieSettingsTab.push(`secure=${optionsVal.secure}`)
        }

        console.log(cookieSettingsTab);

        // używamy właściwości wbudowanej cookie
        document.cookie = cookieSettingsTab.join(';')

    }

    // weryfikacja czy istnieje takie ciastko
    getCookie(name) {

        if(document.cookie != ''){
            const cookies = document.cookie.split(/; */);

            for(let i = 0; i < cookies.length; i++) {

                const cookieName = cookies[i].split('=')[0];
                const cookieVal = cookies[i].split('=')[1];

                if(decodeURIComponent(cookieName) == name){
                    return cookieVal;
                }

            }
        }

    }

    removeCookie(name) {

        this.setCookie({

          name: name,
        //   antydata
          days: -1  

        })

    }

}

