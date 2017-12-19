function loadDatabase(file)
{
    let xhr = new XMLHttpRequest();
    let text = "";
    xhr.open("GET", file, false);
    xhr.overrideMimeType("text/plain");
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState === 4)
        {
            if(xhr.status === 200 || xhr.status == 0)
            {
                text = xhr.responseText;
            }
        }
    }
    xhr.send(null);
    return text;
}

function callback(answer) {
    console.log(answer);
    console.log(pl.format_answer(answer));
}

const session = pl.create(10000);

const db = loadDatabase("database.pl");

session.consult(db);

const what = session.query("get_links(_, _, _, 6, Links).");
session.answer(callback);