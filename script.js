const myBtn = document.querySelector(".btn button");
const rules = document.querySelector(".rules");
const exit = document.querySelector(".buttons .exit");
const option_list = document.querySelector(".myOpt");
const question = document.querySelector(".question");
const con = document.querySelector(".buttons .continue");
const timer = document.querySelector(".time .sec");
const timeLine = document.querySelector(".head .line");

const result = document.querySelector(".resultbox");
const restart = document.querySelector(".resButtons .restart");
const quit = document.querySelector(".resButtons .quit_quiz");


quit.onclick = () => {
    window.location.reload();

}
restart.onclick = () => {
    question.classList.add("dot");
    result.classList.remove("rest");
    rules.classList.remove("activeInfo");


    if (count == questions.length - 1) {
        count = 0;
        score = 0;
        showQuestion(count);

        clearInterval(counter)
        startTime(15);

        clearInterval(counterLine)
        startTimerLine(widthValue);
        but.style.display = "none";
    }
}



myBtn.onclick = () => {
    rules.classList.add("activeInfo");
}
exit.onclick = () => {
    rules.classList.remove("activeInfo");
}
con.onclick = () => {
    rules.classList.remove("activeInfo");
    question.classList.add("dot");

    showQuestion(count);
    clearInterval(counter);
    startTime(15);
    clearInterval(counterLine);
    startTimerLine(0);
    but.style.display = "none";



}
const but = document.querySelector(".next");


let count = 0;
let counter;
timeCount = 15;
let counterLine;
let widthValue = 0;
let score = 0;


but.onclick = () => {
    if (count < questions.length - 1) {
        count++;
        showQuestion(count);

        clearInterval(counter)
        startTime(15);

        clearInterval(counterLine)
        startTimerLine(widthValue);
        but.style.display = "none";
    }
    else {
        box();
    }


}

function showQuestion(index) {
    const text = document.querySelector(".p");
    let optTag = '<div class="option">' + questions[index].options[0] + '</div>'
        + '<div class="option">' + questions[index].options[1] + '</div>'
        + '<div class="option">' + questions[index].options[2] + '</div>'
        + '<div class="option">' + questions[index].options[3] + '</div>'

    let tag = "<span>" + questions[index].num + "." + questions[index].question + "</span>";
    text.innerHTML = tag;
    option_list.innerHTML = optTag;
    const ques = document.querySelector(".que");
    let quesTag = '<p>' + questions[index].num + ' Out Of 5' + '</p>';
    ques.innerHTML = quesTag;


    const option = option_list.querySelectorAll(".option")
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

}
let tick = '<div class="tick"><i class="fa fa-check" style="color:green"></i></div>'
let cross = ' <div class="cross"><i class="fa fa-times" style="color:red"></i></div>'
function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let ans = answer.textContent;
    let correct = questions[count].answer;
    let all = option_list.children.length;
    if (ans == correct) {
        score += 1;
        console.log(score);
        answer.classList.add("correct");
        console.log("Answer is Correct");
        answer.insertAdjacentHTML("beforeend", tick);
    }

    else {
        answer.classList.add("wrong");
        console.log("Answer is Wrong");
        answer.insertAdjacentHTML("beforeend", cross);
        for (let i = 0; i < all; i++) {
            if (option_list.children[i].textContent == correct) {
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tick);
            }
        }
    }
    for (let i = 0; i < all; i++) {
        option_list.children[i].classList.add("disable");
    }
    but.style.display = "block"
}
function box() {
    rules.classList.remove("activeInfo");
    question.classList.remove("dot");
    result.classList.add("rest");
    const scoreText = document.querySelector(".score_text");
    if (score > 3) {
        let scoreTag = '<span>Congratulation..You Got <p>' + score + '</p>  Out Of <p>' + questions.length + ' </p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if (score > 1) {
        let scoreTag = '<span>Carry On...You Got <p>' + score + '</p>  Out Of <p>' + questions.length + ' </p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>Sorry...You Got <p>' + score + '</p>  Out Of <p>' + questions.length + ' </p></span>';
        scoreText.innerHTML = scoreTag;
    }



}
function startTime(time) {
    counter = setInterval(() => {
        timer.textContent = time;
        time--;
        if (time < 9) {
            timer.textContent = 0 + timer.textContent;
        }
        if (time < 0) {
            clearInterval(counter)
            timer.textContent = "00";
        }
    }, 1000);
}
function startTimerLine(time) {
    counterLine = setInterval(() => {
        time += 1;
        timeLine.style.width = time + "px";
        if (time > 319)
            clearInterval(counterLine)
    }, 50);
}
