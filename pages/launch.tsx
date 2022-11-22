import MainMenu from "./components/MainMenu";
import { Fragment, Key, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import axios from "axios";

interface listProps{
    title: String,
    selected: {
        id: Number,
        name: String
    },
    setSelected: (selected: {
        id: Number,
        name: String
    }) => void,
    itemsList: {
        id: Key,
        name: String
    }[]
}

interface checkBoxProps{
    checked: Boolean,
    item: {
        name: String
        point: Number
        selected: Boolean
    },
    selectedSkills :{ 
        name: String 
        point: Number
        selected: Boolean
    }[],
    setSelectedSkills: (selectedSkills :{ 
        name: String, 
        point: Number,
        selected: Boolean
    }[]) => void
}

const candidates = [
    { id: 1, name: 'Candidato 1' },
    { id: 2, name: 'Candidato 2' },
    { id: 3, name: 'Candidato 3' },
    { id: 4, name: 'Candidato 4' },
    { id: 5, name: 'Candidato 5' },
    { id: 6, name: 'Candidato 6' },
    { id: 7, name: 'Candidato 7' },
    { id: 8, name: 'Candidato 8' },
    { id: 9, name: 'Candidato 9' },
    { id: 10, name: 'Candidato 10' },
    { id: 11, name: 'Candidato 11' },
    { id: 12, name: 'Candidato 12' },
    { id: 13, name: 'Candidato 13' },
    { id: 14, name: 'Candidato 14' },
    { id: 15, name: 'Candidato 15' },
    { id: 16, name: 'Candidato 16' },
    { id: 17, name: 'Candidato 17' },
    { id: 18, name: 'Candidato 18' },
    { id: 19, name: 'Candidato 19' },
]

const evaluators = [
    { id: 1, name: 'Isabel de Mendonça Damasceno' },
    { id: 2, name: 'Rebeca Araujo Bezerra' },
    { id: 3, name: 'Paulina Eduarda Freitas Silva' },
    { id: 4, name: 'Jumario José de Sousa' },
    { id: 5, name: 'Anna Júlia Silva de Lima' },
    { id: 6, name: 'Eric Iechaia Araújo PIAUILINO' },
    { id: 7, name: 'Helton Nogueira Uchôa' }
]

const skills = [
    { name: 'Comunicativo', point: 0.5, selected: false},
    { name: 'Liderança', point: 0.5, selected: false },
    { name: 'Criativo', point: 1, selected: false },
    { name: 'Organizado', point: 1, selected: false },
    { name: 'Brincalhão', point: -0.5, selected: false },
    { name: 'Desperso', point: -1, selected: false},
    { name: 'Tímido', point: -0.5, selected: false },
    { name: 'Grosseiro', point: -1, selected: false },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const ListBox = ({title, itemsList, setSelected, selected}: listProps) => {
    return (
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
            <>
                <Listbox.Label className="block text-sm font-medium text-white">{title}</Listbox.Label>
                <div className="mt-1 mb-4">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border text-gray-700 border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="flex items-center">
                            <span className="ml-3 block truncate">{selected.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </Listbox.Button>
                    <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm w-[95%]">
                            {itemsList.map((item) => (
                            <Listbox.Option key={item.id} className={({ active }) => classNames( active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9' ) } value={item}>
                                {({ selected, active }) => (
                                <>
                                    <div className="flex items-center">
                                    <span
                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                    >
                                        {item.name}
                                    </span>
                                    </div>

                                    {selected ? (
                                    <span
                                        className={classNames(
                                        active ? 'text-white' : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                    >
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    ) : null}
                                </>
                                )}
                            </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </>)}
        </Listbox>
    );
}

function CheckIcon(props: any) {
    return (
      <svg viewBox="0 0 24 24" fill="none" {...props}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
          d="M7 13l3 3 7-7"
          stroke="#fff"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
}

function CheckBoxItem({ checked, item, selectedSkills, setSelectedSkills }: checkBoxProps){   
    return (
        <div className={`focus:ring-2 focus:ring-white focus:ring-opacity-60 focus:ring-offset-2 focus:ring-offset-sky-300 text-white bg-opacity-75 ${checked ? 'bg-gradient-to-r from-green-400 to-cyan-500' : 'bg-sky-900 bg-opacity-75 '} relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none m-2`}
            onClick={() => {
                const newState = selectedSkills.map(obj => {
                    if (obj.name === item.name) {
                      return {...obj, selected: !item.selected};
                    }
                    return obj;
                  });
              
                setSelectedSkills(newState);
            }}>
            <div className="flex w-full items-center justify-between transition-all duration-500 ease-linear">
                <div className="flex items-center">
                    <div className="text-sm">
                        <div className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}> 
                            <span>{item.name}</span>
                        </div>
                        <div className={`inline ${ checked ? 'text-sky-100' : 'text-gray-500' }`}> 
                            <span>{item.point.toString()} Pontos  </span>
                        </div>
                    </div>
                </div>
                {checked && (
                    <div className="shrink-0 text-white">
                    <CheckIcon className="h-6 w-6" />
                    </div>
                )}
            </div>
        </div>
    )
}
  

export default function Launch(){
    const [selected, setSelected] = useState<{ id: Number, name: String }>({id: 0, name: '-- Selecione Candidato --'});
    const [selectedEvaluator, setSelectedEvaluator] = useState<{ id: Number, name: String }>({id: 0, name: '-- Selecione Avaliador(a) --'});
    const [selectedSkills, setSelectedSkills] = useState<{ name: String, point: Number, selected: Boolean}[]>(skills);

    const handleSubmit = () => {
        const ableSkills = selectedSkills.map(item => {
            if(item.selected)
                return {
                    name: item.name,
                    point: item.point
                }
            
        }).filter(n => n);

        if(selected.id !== 0 && selectedEvaluator.id !== 0 && (ableSkills && ableSkills.length)){
            axios.post('/api/create', {
                candidate: selected.name,
                evaluator: selectedEvaluator.name, 
                skills: ableSkills
            }).then(() => {
                alert("Dados inseridos com sucesso");
                window.location.reload();
            }).catch(() => {
                alert("Houve erro ao inserir dados");
            })

        }else alert('Atenção\nPreencher todos os campos corretamente');
    }

    return (
        <div className="bg-slate-900 text-white">
            <MainMenu subtitle={'Lançar'} />
            <main className="min-h-screen transition-all relative flex justify-center bg-opacity-30 pb-4">
                <div className="bg-slate-800 min-w-[90vw] rounded-sm p-4 mt-4 overflow-hidden relative">
                    <ListBox title="Quem está avaliando?" selected={selectedEvaluator} setSelected={setSelectedEvaluator} itemsList={evaluators} />
                    <ListBox title='Selecione Candidato' selected={selected} setSelected={setSelected} itemsList={candidates} />
                    <div className="py-2">
                        <span className="block text-sm font-medium text-white mb-4">Selecione as skills</span>
                        <div className="grid grid-cols-2 md:grid-cols-3 transition-all duration-500 ease-linear">
                            {selectedSkills.map((item, index) => (
                                <CheckBoxItem checked={item.selected} item={item} key={index} selectedSkills={selectedSkills} setSelectedSkills={setSelectedSkills} />
                            ))}
                        </div>
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleSubmit}>
                        ENVIAR
                    </button>
                </div>
            </main>
        </div>
    );
}