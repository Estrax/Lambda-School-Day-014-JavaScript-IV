// CODE here for your Lambda Classes

class Person{
    constructor(attributes){
        this.name = attributes.name;
        this.age = attributes.age;
        this.location = attributes.location;
        this.gender = attributes.gender;
    }

    speak(){
        console.log(`Hello my name is ${this.name}, I am from ${this.location}`);
    }
};

class Instructor extends Person{
    constructor(attributes){
        super(attributes);
        this.specialty = attributes.specialty;
        this.favLanguage = attributes.favLanguage;
        this.catchPhrase = attributes.catchPhrase;
    }

    demo(subject){
        console.log(`Today we are learning about ${subject}`);
    }

    grade(student, subject){
        console.log(`${student.name} receives a perfect score on ${subject}`);
    }

    changeGrade(student){
        student.grade += Math.floor(Math.random()*(5-(-5))+5);
        if(student.grade < 1) student.grade = 1;
        if(student.grade > 100) student.grade = 100;
        return student.grade;
    }
};

class Student extends Person{
    constructor(attributes){
        super(attributes);
        this.previousBackground = attributes.previousBackground;
        this.className = attributes.className;
        this.favSubjects = attributes.favSubjects;
        this.grade = attributes.grade;
    }

    listsSubjects(){
        this.favSubjects.forEach(elem => console.log(elem));
    }

    PRAssignment(subject){
        console.log(`${this.name} has submitted a PR for ${subject}`);
    }

    sprintChallenge(subject){
        console.log(`${this.name} has begun sprint challenge on ${subject}`);
    }

    graduate(instructor){
        if(this.grade > 70) console.log(`${this.name} has graduated!`);
        else {
            console.log(`${this.name} needs to study more, because the current score is ${this.grade}.`);
            return instructor.changeGrade(this) && this.graduate(instructor);
        }
    }
};

class ProjectManager extends Instructor{
    constructor(attributes){
        super(attributes);
        this.gradClassName = attributes.gradClassName;
        this.favInstructor = attributes.favInstructor;
    }

    standUp(channel){
        console.log(`${this.name} announces to ${channel}, @channel standUp times!​​​​​`);
    }

    debugsCode(student, subject){
        console.log(`${this.name} debugs ${student.name}\'s code on ${subject}`);
    }
};


/* ===== TESTS ===== */

/* PERSON CLASS */

const andrew = new Person({
    name: 'Andrew',
    age: 26,
    location: 'Seattle, WA',
    gender: 'male'
});

const john = new Person({
    name: 'John',
    age: 58,
    location: 'San Francisco, CA',
    gender: 'male'
});

const christina = new Person({
    name: 'Christina',
    age: 24,
    location: 'New York City, NY',
    gender: 'female'
});

console.log(andrew);
console.log(john);
console.log(christina);
christina.speak();
andrew.speak();
john.speak();

/* STUDENT CLASS */

const david = new Student({
    name: 'David',
    location: 'Winnipeg, MB',
    age: 23,
    gender: 'male',
    previousBackground: 'waiter',
    className: 'CS01',
    favSubjects: ['HTML5', 'CSS3', 'Algorithms and Data Structures'],
    grade: 59
});

const susan = new Student({
    name: 'Susan',
    location: 'San Diego, CA',
    age: 26,
    gender: 'female',
    previousBackground: 'business development manager',
    className: 'CS06',
    favSubjects: ['Algorithms and Data Structures', 'Python'],
    grade: 62
});

const karen = new Student({
    name: 'Karen',
    location: 'Phoenix, AZ',
    age: 29,
    gender: 'female',
    previousBackground: 'marketing manager',
    className: 'DS705',
    favSubjects: ['Descriptive statistics', 'Python', 'Reinforcement Learning', 'Natural Language Processing'],
    grade: 43
});

console.log(david);
console.log(susan);
console.log(karen);
susan.speak();
karen.speak();
david.listsSubjects();
susan.listsSubjects();
karen.PRAssignment('Python');
susan.PRAssignment('HTML5');
david.sprintChallenge('Advanced CSS');
karen.sprintChallenge('Natural Language Processing');

/* INSTRUCTOR CLASS */

const fred = new Instructor({
    name: 'Fred',
    location: 'Bedrock',
    age: 37,
    gender: 'male',
    favLanguage: 'JavaScript',
    specialty: 'Front-end',
    catchPhrase: 'Don\'t forget the homies'
});

const brad = new Instructor({
    name: 'Brad',
    location: 'Vancouver, BC',
    age: 44,
    gender: 'male',
    favLanguage: 'Python',
    specialty: 'Back-end',
    catchPhrase: 'Meet me on the other side'
});

const ryan = new Instructor({
    name: 'Ryan',
    location: 'Provo, UT',
    age: 33,
    gender: 'male',
    favLanguage: 'Python',
    specialty: 'Data Science',
    catchPhrase: 'Yoooo I am coming!'
});

console.log(fred);
console.log(brad);
console.log(ryan);
ryan.speak();
brad.speak();
fred.demo('JavaScript');
brad.demo('Django');
brad.demo('Authentication');
ryan.demo('Unsupervised Learning');
ryan.grade(david, 'Advanced CSS');
brad.grade(karen, 'Introduction to Distributed Systems');
fred.grade(susan, 'Deep Learning');

console.log(susan.grade);
fred.changeGrade(susan);
console.log(susan.grade);

/* PROJECT MANAGER CLASS */

const lisa = new ProjectManager({
    name: 'Lisa',
    location: 'Miami, FL',
    age: 36,
    gender: 'female',
    favLanguage: 'Rust',
    catchPhrase: 'Here I am!',
    specialty: 'Data Science',
    gradClassName: 'DS59',
    favInstructor: ryan
});

const james = new ProjectManager({
    name: 'James',
    location: 'Denver, CO',
    age: 29,
    gender: 'male',
    favLanguage: 'C++',
    catchPhrase: 'I am the only one!',
    specialty: 'Full Stack Web',
    gradClassName: 'CS03',
    favInstructor: fred
});

console.log(lisa);
lisa.speak();
console.log(james);
james.speak();
lisa.standUp('WEB17');
james.standUp('CS999');
lisa.debugsCode(susan, 'Advanced README.md');
james.debugsCode(karen, 'Natural Language Understanding');
james.demo('JavaScript');
lisa.demo('Django');
james.demo('Authentication');
james.demo('Unsupervised Learning');
lisa.grade(david, 'CSS Animations');
james.grade(karen, 'API Design');
james.grade(susan, 'Databases');

karen.graduate(fred);