import { useRef, useState, Fragment, useEffect } from 'react';
import { RocketLaunchIcon, ArrowDownOnSquareIcon, StarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Link from 'next/link';
import MainMenu from './components/MainMenu';
import { Dialog, Transition } from '@headlessui/react'

export default function Home() {
  const [open, setOpen] = useState(false);
  const [rank, setRank] = useState<{name?: String, points?: Number}[]>([]);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const bootstrap = async () => {
      let mountRank:{name?: String, points?: Number}[] = [];
  
      await axios.post('/api/get').then(({ data }) => {
        data.data.map((e: any) => {
            let total = 0;
            Object.keys(e?.skills).forEach((sItem: any) => {
              return total += e?.skills[sItem].point
            });

            let getindx = mountRank.findIndex(fRank => fRank.name == e.candidate);

            if(getindx != -1){
              mountRank[getindx].points = Number(mountRank[getindx]?.points) + total;
            }else{
              mountRank.push({
                name: e.candidate,
                points: Number(total)
              })
            }
        });

        mountRank.sort((a, b) => Number(b.points) - Number(a.points));
      })
  
      setRank(mountRank);
    }; 

    bootstrap();
  }, [])

  const handleGet = () => {
    axios.post('/api/get').then(({ data }) => {
      if (data?.data?.length) {
        const header = ["Candidato", "Avaliador", "Habilidades", "Pontos", "Data"]
        let csvContent = "data:text/csv;charset=utf-8," + header.join(";") + "\n" +
          data.data.map((e: any) => {
            return Object.keys(e).map(i => {
              if (i !== "id" && i !== "updatedAt") {
                if (i == "skills") {
                  let total = 0;
                  Object.keys(e[i]).forEach((sItem: any) => {
                    return total += e[i][sItem].point
                  });

                  return Object.keys(e[i]).map((sItem: any) => {
                    return e[i][sItem].name
                  }).join("/") + ";" + total;
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

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                          Pontuação dos candidatos
                        </Dialog.Title>
                        <div className="mt-2">
                          <table className="table-auto w-full">
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Pontos</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rank.map((item, index) => (
                                <tr key={index}>
                                  <td>{item.name}</td>
                                  <td>{item.points?.toString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" onClick={() => setOpen(false)}
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                      Fechar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="min-h- transition-all relative flex justify-center items-center bg-opacity-30">
        <div className="bg-slate-800 bg-opacity-10 min-w-[60vw] rounded-sm grid items-center p-2">
          <Link href="/launch" className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-orange-400 to-pink-600 p-5 w-full my-2">
            <RocketLaunchIcon className="h-12 w-12" />
            LANÇAR
          </Link>
          <button onClick={handleGet} className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-green-400 to-cyan-500 p-5 w-full my-2">
            <ArrowDownOnSquareIcon className='h-12 w-12' />
            EXTRAIR
          </button>
          <button onClick={() => setOpen(!open)} className="flex flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-cyan-400 to-sky-500 p-5 w-full my-2">
            <StarIcon className='h-12 w-12' />
            RANK
          </button>
        </div>
      </main>
    </div>
  )
}
