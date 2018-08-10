export class BaseElement {
    title?: string;
    attributes?: {};
    cssClass?: string;
    id?: string;
    name?: string;
}

export class Section extends BaseElement {
    groups: Group[];
}

export class Group extends BaseElement {
    questions: Question[];
}

export class Question extends BaseElement {
    type: 'text' | 'date' | 'number' | 'textarea' | 'select' | 'radio' | 'file';
    validations: Validation[];
    value: any;
    accept: string;
    options: IOption[];
    lines: number;
}

export class IOption {
    title: string;
    value: any;
}

export class Validation {
}

export class Form extends BaseElement {
    sections: Section[];
    submitUrl?: string;
    successUrl?: string;
    successMessage?: string;
    errorMessage?: string;
    method = 'POST';
}
