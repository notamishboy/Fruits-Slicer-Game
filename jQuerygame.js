
var playing = false;
var score;
var trialsleft;
var fruits = ['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var step;    
var action;

//Slice fruit
    //play sound in the background
    //explode fruits

$(function(){
    $('#startreset').click(function(){
        //are we playing?
        if(playing == true){
            //yes
                //reload
            location.reload();
        }else{
            //no
            playing = true;
            
            score = 0;
            $('#scorevalu e').html(score);
            
            // make trialsbox appear
            $('#trialsleft').show();
            trialsleft = 3;
            addHeart();

            //hide gameover box
            $('#gameover').hide()

            //change button text to reset game
            $('#startreset').html('Reset Game');
            startAction();
        }
    });

    $('#fruit1').mouseover(function(){
        score+=1;
        $('#scorevalue').html(score); //update
        $('#slicesound')[0].play(); //play sound

        //stop fruit
        clearInterval(action);

        //hide using animation
        $('#fruit1').hide("explode",500); //slice the fruit

        //set time out
        setTimeout(startAction,500);
    });

function addHeart(){
    $('#trialsleft').empty();
    for(i=0;i<trialsleft;i++){
        
        $('#trialsleft').append('<img src="images/heart.png" class="life">')
    }
}

function startAction(){
    
    //generating fruit
    $('#fruit1').show();
    chooseFruit();//choose a random fruit
    $('#fruit1').css({'left':Math.round(Math.random()*500),'top':-50});

    //generate random step (1px - 6px)
    step = 1 + Math.round(Math.random()*5) //changing step

    action = setInterval(function(){
        //moving the fruit down by one step
        $('#fruit1').css('top',$('#fruit1').position().top+step)

        //if the fruit is too low
        if($('#fruit1').position().top>$('#fruitcontainer').height()){
            //CHECK IF TRIALS LEFT
            if(trialsleft>1){
                
                $('#fruit1').show();
                chooseFruit();//choose a random fruit
                $('#fruit1').css({'left':Math.round(Math.random()*500),'top':-50});
                
                //generate random step (1px - 6px)
                step = 1 + Math.round(Math.random()*5) //changing step

                trialsleft-=1;

                //populate trials left box
                addHeart()

            }else{
                //GameOver
                playing=false;
                $('#startreset').html('Start Game')
                $('#gameover').show();
                $('#gameover').html("<p>Game Over!</p><p>Your score is "+score+"</p>");
                stopAction();
                $('#trialsleft').hide();
            }
        }
    },10)
}

function chooseFruit(){
    $('#fruit1').attr('src','images/'+ fruits[Math.round(8*Math.random())] +'.png');
}

//Stop dropping fruits
function stopAction(){
    clearInterval(action);
    $('#fruit1').hide();
}
});