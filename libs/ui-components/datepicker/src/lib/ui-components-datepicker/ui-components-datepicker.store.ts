import { ComponentStore } from '@ngrx/component-store';
import * as moment from 'moment';

type State = {
    year: number,
    month: number,
    day: number

    selectionFrom: string,
    selectionTo: string

    maxRange: number
}

const initialState: State = {
    year: 0,
    month: 0,
    day: 0,
    selectionFrom: '',
    selectionTo: '',
    maxRange: 12
}

const generateEmpty = () => {
    return {
        labels: {
            day: '',
            month: ''
        },
        utc: '',
        iso: '',
        unix: '',
        from: false,
        to: false,
        between: false,
        disabled: false
    }
}

export class DatepickerStore extends ComponentStore<State>{
    constructor(){
        super(initialState)
    }

    //selectors
    readonly year$ = this.select(state => state.year)
    readonly month$ = this.select(state => state.month)
    readonly day$ = this.select(state => state.day)
    readonly selectionFrom$ = this.select(state => state.selectionFrom)
    readonly selectionTo$ = this.select(state => state.selectionTo)
    readonly maxRange$ = this.select(state => state.maxRange)



    readonly selectDaysInMonth$ = this.select(
        this.year$,
        this.month$,
        this.selectionFrom$,
        this.selectionTo$,
        this.maxRange$,
        (year, month, selectionFrom, selectionTo, maxRange) => {
            const daysArray = Array.from({length: moment().year(year).month(month).daysInMonth()}, (x, i) => moment().year(year).month(month).startOf('month').add(i, 'days').format('DD'))            
            const daysArrayFullInfo = daysArray.map((day: any) => {
                const utc = moment().year(year).month(month).date(Number(day)).startOf('day').utc().format()
                const iso = moment().year(year).month(month).date(Number(day)).startOf('day').format()
                const unix = moment().year(year).month(month).date(Number(day)).startOf('day').unix()
                return {
                    labels: {
                        day,
                        month: moment().year(year).month(month).date(Number(day)).startOf('day').format('MMM')
                    },
                    utc,
                    iso,
                    unix,
                    from: selectionFrom === iso,
                    to: selectionTo === iso,
                    between: selectionFrom < iso && selectionTo > iso,
                    disabled: !!selectionFrom.length && moment(selectionFrom).add(maxRange, 'days').format() < iso
                }
            })
            
            
            const startDistance = Array.from({length: moment().year(year).month(month).startOf('month').day()}, generateEmpty)
            const fromEndtoEnd = 6 - moment().year(year).month(month).endOf('month').day()
            const endDistance = Array.from({length: fromEndtoEnd > 0 ? fromEndtoEnd : 0}, generateEmpty)
            const fullArray = [...startDistance, ...daysArrayFullInfo, ...endDistance];
            const numberOfGroups = Math.ceil(fullArray.length / 7)
            const groupArrays = Array.from({length: numberOfGroups}, (x, i) => {
                return fullArray.slice(i*7, i*7+7)
            }).map(week => {
                const firstDate: any = week.find(d => d.iso !== '')
                const index = moment(firstDate.iso).week();
                return {
                    index,
                    data: week
                };
            })
            return groupArrays;
        }
    )

    readonly labels$ = this.select(
        this.year$,
        this.month$,
        (year, month) => {
            return {
                year: moment().year(year).month(month).format("yyyy"),
                month: moment().year(year).month(month).format("MMM yyyy"),
                day: moment().year(year).month(month).format("DD ddd")
            }
        }
    )

    vm$ = this.select(
        this.selectDaysInMonth$,
        this.labels$,
        this.selectionFrom$,
        this.selectionTo$,
        (
            daysInMonth,
            labels,
            selectionFrom,
            selectionTo 
        ) => {
            return {
                daysInMonth,
                labels,
                byWeeks: daysInMonth,
                selectionFrom: moment(selectionFrom).format('YYYY-MM-DD'),
                selectionTo: moment(selectionTo).format('YYYY-MM-DD'),
                validSelection: selectionFrom.length && selectionTo.length
            }
        }
    )


    //updaters
    changeMonthBy = this.updater((state, diff: number) => { 
        const newDate: moment.Moment = moment().year(state.year).month(state.month).startOf('month').add(diff, 'months')
        return {
            ...state,
            month: newDate.month(),
            year: newDate.year()
        
        }
    })

    updateSelection = this.updater((state, date:string) => {

        if(state.selectionFrom > date){
            return {...state, selectionFrom: date, selectionTo: date}
        }

        if(state.selectionFrom === date){
            return {...state, selectionFrom: '', selectionTo: ''}
        }

        if(state.selectionTo === date){
            return {...state, selectionTo: state.selectionFrom}
        }

        if(!state.selectionFrom.length){
            return {...state, selectionFrom: date, selectionTo: date}
        }

        if(!!state.selectionFrom.length){
            return {...state, selectionTo: date}
        }


        return {...state}
    })
    
}