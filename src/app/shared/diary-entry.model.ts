
export class DiaryEntry{
    constructor(
        public date: string,
        public exercise: string,
        public duration: string,
        public calories: string,
        public id?: string // Make ID optional
      ) {}
    }