function create_bomb_map(){
    var counter=0;
    while(counter<7)
    {
        var random_index=Math.floor(Math.random() * 25);
        if(bomb_index.indexOf(random_index)===-1)
        {
            bomb_index.push(random_index);
            buttons[Math.floor(random_index/5)][random_index%5].value="bomb";
            counter++;
        }
    }
}
function create_field_map(){
    for (var i=0;i<25;i++)
    {
        if (buttons[Math.floor(i/5)][i%5].value !== "bomb"){
            safe_field_index.push(i);
            let num_of_bombs_around_field=counting_bombs_around_field(i);
            buttons[Math.floor(i/5)][i%5].value=num_of_bombs_around_field;
        }
    }
}

function counting_bombs_around_field(index_of_field){
    var counter=0;
    var x=Math.floor(index_of_field/5);
    var y=index_of_field%5;
    
    for (var i=y-1;i<=y+1;i++)
    {
        if (i>=0 && i<5){
            if (x-1>=0 && x-1<5 && buttons[x-1][i].value==="bomb") counter++;
            if (x+1>=0 && x+1<5 && buttons[x+1][i].value==="bomb") counter++;
        }
    }
    if (y-1>=0 && y-1<5)
        if (buttons[x][y-1].value==="bomb") counter++;
    if (y+1>=0 && y+1<5)
        if (buttons[x][y+1].value==="bomb") counter++;

    return counter;
}

function check_field(button){
    if (button.value==="bomb")
    {
        button.style.backgroundImage="url('photo/bomb.jpg')";
        console.log("UPS. BOMBA");
        return 0;
    }
    else{
        button.innerHTML=button.value;  
    }
}
function PlaceRemove_flag(button){
    if (button.innerHTML==="")
        if (button.style.backgroundImage==="")    
            button.style.backgroundImage="url('photo/flag.jpg')";
        else button.style.backgroundImage="";
}


var array=document.querySelectorAll('[data-row]');
var buttons=[];
for (var i=0;i<5;i++){
    var one_row_of_field=[];
    for (var j=0;j<5;j++){
        one_row_of_field.push(array[j+i*5]);
    }
    buttons.push(one_row_of_field);
}
var bomb_index=[],safe_field_index=[];

create_bomb_map();
create_field_map();

buttons.forEach(one_row => {
    one_row.forEach(button => {
        button.addEventListener('click', () =>{
            check_field(button);
        })
        button.addEventListener('contextmenu', () =>{
            document.addEventListener('contextmenu', event=>{
                event.preventDefault();
            })
            PlaceRemove_flag(button);
            document.removeEventListener('contextmenu', event=>{
                event.preventDefault();
            })  
        })
    })
})