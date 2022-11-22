import {RocketLaunchIcon, ArrowDownOnSquareIcon} from '@heroicons/react/24/solid';
import axios from 'axios';
import Link from 'next/link';
import MainMenu from './components/MainMenu';

export default function Home() {
  const handleGet = () => {
    axios.post('/api/get').then(({data}) => {
        if(data?.data?.length){
          const header = ["Candidato","Grupo","Avaliador","Habilidades","Pontos","Data"]
          let csvContent = "data:text/csv;charset=utf-8,"+header.join(";")+"\n"+
               data.data.map((e: any) => {
                  return Object.keys(e).map(i => {
                    if(i !== "id" && i !== "updatedAt"){
                      if(i == "skills"){
                        let total = 0;
                        Object.keys(e[i]).forEach((sItem: any) => {
                          return total += e[i][sItem].point
                        });

                        return Object.keys(e[i]).map((sItem: any) => {
                          return e[i][sItem].name 
                        }).join("/")+";"+total;
                      }
                      return e[i];
                    }
                  }).filter(n => n).join(";");
              }).join("\n")

          var encodedUri = encodeURI(csvContent);
          window.open(encodedUri);
        }
    }).catch(() => {
        alert("Houve erro ao recuperar dados");
    })
}


  return (
    <div className="bg-slate-900 text-white">
      <MainMenu subtitle={'Home'} />
      <main className="min-h-screen transition-all relative flex justify-center items-center bg-opacity-30">
        <div className="bg-slate-800 min-w-[30vw] rounded-sm grid items-center p-4">
          <Link href="/launch" className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-orange-400 to-pink-600 p-5 w-full my-2">
            <RocketLaunchIcon className="h-12 w-12"/>
            LANÇAR
          </Link>
          <button onClick={handleGet} className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-green-400 to-cyan-500 p-5 w-full my-2">
            <ArrowDownOnSquareIcon className='h-12 w-12' />
            EXTRAIR
          </button>
        </div>
      </main>
    </div>
  )
}
