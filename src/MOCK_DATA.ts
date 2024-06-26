import { Employee } from "./models/employee"
import { z } from 'zod'

const DATABASE = z.map(z.string(), Employee)

type DATABASE = z.infer<typeof DATABASE>

export const DATA: DATABASE = new Map([
    ["1", {"id":1,"name":"Emile","salary":1989,"department":"HR"}],
    ["2", {"id":2,"name":"Quent","salary":1385,"department":"PS"}],
    ["3", {"id":3,"name":"Christi","salary":1436,"department":"PS"}],
    ["4", {"id":4,"name":"Idaline","salary":1519,"department":"PS"}],
    ["5", {"id":5,"name":"Culver","salary":2266,"department":"HR"}],
    ["6", {"id":6,"name":"Barbra","salary":3238,"department":"PS"}],
    ["7", {"id":7,"name":"Zachariah","salary":1617,"department":"PS"}],
    ["8", {"id":8,"name":"Gabriella","salary":3244,"department":"PS"}],
    ["9", {"id":9,"name":"Lidia","salary":2221,"department":"PS"}],
    ["10", {"id":10,"name":"Alaster","salary":2474,"department":"PS"}],
    ["11", {"id":11,"name":"Nanci","salary":2352,"department":"HR"}],
    ["12", {"id":12,"name":"Roseanna","salary":3153,"department":"PS"}],
    ["13", {"id":13,"name":"Fay","salary":1274,"department":"PS"}],
    ["14", {"id":14,"name":"Findlay","salary":2896,"department":"HR"}],
    ["15", {"id":15,"name":"Blakelee","salary":1885,"department":"PS"}],
    ["16", {"id":16,"name":"Tammi","salary":3063,"department":"PS"}],
    ["17", {"id":17,"name":"Aluin","salary":2180,"department":"PS"}],
    ["18", {"id":18,"name":"Yancey","salary":1913,"department":"HR"}],
    ["19", {"id":19,"name":"Peadar","salary":2756,"department":"PS"}],
    ["20", {"id":20,"name":"Lauralee","salary":3214,"department":"PS"}],
    ["21", {"id":21,"name":"Carlynne","salary":2330,"department":"PS"}],
    ["22", {"id":22,"name":"Kendra","salary":1784,"department":"HR"}],
    ["23", {"id":23,"name":"Nolana","salary":2472,"department":"PS"}],
    ["24", {"id":24,"name":"Darnell","salary":1755,"department":"HR"}],
    ["25", {"id":25,"name":"Koren","salary":2587,"department":"PS"}],
    ["26", {"id":26,"name":"Carlyle","salary":3143,"department":"HR"}],
    ["27", {"id":27,"name":"Constancia","salary":1553,"department":"PS"}],
    ["28", {"id":28,"name":"Noland","salary":1388,"department":"HR"}],
    ["29", {"id":29,"name":"Leslie","salary":1420,"department":"PS"}],
    ["30", {"id":30,"name":"Devi","salary":3179,"department":"PS"}],
    ["31", {"id":31,"name":"Sisile","salary":2927,"department":"HR"}],
    ["32", {"id":32,"name":"Kelbee","salary":1576,"department":"PS"}],
    ["33", {"id":33,"name":"Lolly","salary":2203,"department":"PS"}],
    ["34", {"id":34,"name":"Bianka","salary":1299,"department":"PS"}],
    ["35", {"id":35,"name":"Melonie","salary":3278,"department":"HR"}],
    ["36", {"id":36,"name":"Mandi","salary":2479,"department":"PS"}],
    ["37", {"id":37,"name":"Randolph","salary":3023,"department":"HR"}],
    ["38", {"id":38,"name":"Giulia","salary":2304,"department":"HR"}],
    ["39", {"id":39,"name":"Lion","salary":3293,"department":"PS"}],
    ["40", {"id":40,"name":"Dorthy","salary":2096,"department":"HR"}],
    ["41", {"id":41,"name":"Helene","salary":1257,"department":"PS"}],
    ["42", {"id":42,"name":"Eloisa","salary":2367,"department":"HR"}],
    ["43", {"id":43,"name":"Libbie","salary":2483,"department":"PS"}],
    ["44", {"id":44,"name":"Sherlocke","salary":1384,"department":"PS"}],
    ["45", {"id":45,"name":"Conroy","salary":2355,"department":"PS"}],
    ["46", {"id":46,"name":"Thadeus","salary":3262,"department":"PS"}],
    ["47", {"id":47,"name":"Tori","salary":2532,"department":"PS"}],
    ["48", {"id":48,"name":"Duncan","salary":2881,"department":"HR"}],
    ["49", {"id":49,"name":"Mitch","salary":2547,"department":"PS"}],
    ["50", {"id":50,"name":"Christean","salary":2727,"department":"HR"}]
])