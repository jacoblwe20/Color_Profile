    (function($){
        
        var data = color_form,
            storage = data.data,
            current = data.current,
            currentSection,
            colorNum,
            cyr = {
                dash : 'E',
                colon : 'O',
                slash : 'I',
                comma : 'Q'
            },
            //Validate Colors Input Section Number
            validate = {
                colors : function(i){
                    var missing = [], block = $('.errors');
                    
                    for(var p = 0; p < data.sections[i].questions.length; p += 1){
                        if(typeof color_form.data[i] === 'undefined'|| typeof color_form.data[i][p] === 'undefined'){
                            missing.push([i,p]);
                            //console.log('missing : ' + i + '-' + p);
                        }
                    }
                    
                    //console.log(missing);
                    // Add Extra Styles Here                
                    for(var q = 0; q < missing.length; q +=1){
                        $('.color_preview[rel=' + missing[q][0]+'-'+missing[q][1]+ ']').parent('li.col_third').css('border-color', '#ff0000');
                        //console.log();
                    }
                    
                    //Return Right Result && toggle error block
                    if(missing.length > 0){
                        block.show();
                        return false;
                    }else{
                        block.hide();
                        return true;
                    }
                },
                form : function(obj){
                    for(var key in obj){
                        var item = obj[key];

                        if(item === ''){
                            return false;
                        }
                    }

                    return true;
                }
            },
            validateColorData = function(i){
                
                    
            },
            validateForm = function(obj){
                
            }
            hash = {
                //Interperate Hash Chars - implement in php to pass to email
                parser : function(){
                    var hash = window.location.hash,
                        exData = hash.split(cyr.slash),
                        parsed = [], arr;
                        
                        exData[0] = exData[0].replace('#', '');
                    
                    if(exData.length > 0){
                        for(var i = 0; i < exData.length; i += 1){
                            parsed.push(exData[i].split(cyr.colon));
                        }
                        
                        for(i = 0; i < parsed.length; i += 1){
                            var key = parsed[i][0],
                            num = [];
                            
                            key = key.split(cyr.dash);
                            num[0] = parseFloat(key[0]);
                            num[1] = parseFloat(key[1]);
                            parsed[i][0] = num,
                            commaIs = new RegExp(cyr.comma, 'g');

                            if(commaIs.test(parsed[i][1]) && parsed[i][1].split(cyr.comma).length > 0){
                                arr = parsed[i][1].split(cyr.comma);
                                //console.log(arr);
                            }else{
                                arr = null
                                parsed[i][1] = parseFloat(parsed[i][1]);
                            }
                            
                            if(typeof num[0] === 'number' && !isNaN(num[0]) && typeof num[1] === 'number' && !isNaN(num[1]) && typeof parsed[i][1] === 'number' && !isNaN(parsed[i][1]) ){

                                storeData(num[0], num[1], parsed[i][1]);
                                
                            }else if(typeof arr === 'object' && arr !== null){

                                var m = 0;
                                while(m < arr.length){
                                    storeData(num[0], num[1], parseFloat(arr[m]), m);
                                    //console.log([num[0], num[1], parseFloat(arr[m]), m]);
                                    m += 1;
                                }
                            }                      
                            
                        }
                
                    }
                },
                // Creat hash
                creator : function(x, y, z, k){
                    var hash = window.location.hash,
                        sectionNum = x + cyr.dash + y,
                        pattern = new RegExp(sectionNum);
                        
                        if(pattern.test(hash)){
                            
                            var section = hash.split(pattern), replace;
                            
                            section = section[1];
                            
                            section = section.split(cyr.slash);
                             
                             section = section[0];
                             
                            replace = sectionNum + section;
                            
                            if(typeof k !== 'undefined'){
                                var vars = storage[x][y];
                                vars = vars.join(cyr.comma);
                                window.location.hash = window.location.hash.replace(replace, sectionNum + cyr.colon  + vars );
                            }else{
                                window.location.hash = window.location.hash.replace(replace, sectionNum + cyr.colon + z);
                            }
                        }else{
                            window.location.hash = hash + x + cyr.dash + y + cyr.colon + z + cyr.slash;
                        };
                }
            }
            //Store the Data
            // Need to add on another variable for more then one color seletor
            storeData = function(x, y, z){
                //console.log(arguments);
                if(typeof storage[x] === 'undefined'){
                    storage[x] = [];
                }
                
                if(typeof arguments[3] !== 'undefined'){
                    if(typeof storage[x][y] === 'undefined'){
                        storage[x][y] = [];    
                    }
                    
                    storage[x][y][arguments[3]] = z;
                }else{
                    storage[x][y] = z;
                }

                hash.creator(x, y, z, arguments[3]);
                
            },
            //Get Color Code
            //Need to addd on another varibale for multi colors
            getColor = function(i, p){
                var theColor;
                if(typeof storage[i] !== 'undefined'){
                    if(typeof storage[i][p] !== 'undefined'){
                        if(typeof storage[i][p] === 'object'){
                            theColor = storage[i][p];
                        }else{
                            theColor = color_form.colors[storage[i][p]];
                        }
                    }
                }

                if(typeof theColor === 'object'){
                    return theColor;
                }else if(typeof theColor !== 'undefined'){
                    return '#' + theColor;
                }else{
                    return '#fff';
                }
            },
            //Build 
            build = {
                //Attach Events to new elements
                events : function(){
                    $('.color_preview').bind('click', function(){
                        
                        $('.color_preview').each(function(){
                            
                            $(this).removeClass('focus');
                            
                        });
                        
                        var rel = $(this).attr('rel');
                        
                        current = rel;
                        

                        $(this)
                            .addClass('focus')
                            .parent('li')
                            .attr('style', ''); 
                        
                        //cue(0);
                        
                    });
                    
                    $('.next_contact').bind('click', function(){
                        build.contact();    
                    });
                    
                    $('.next_overview').bind('click', function(){
                        var vali = validate.colors(currentSection);
                        
                        if(vali){
                            currentSection += 1;
                            build.overview();
                        }
                    });
                    
                    $('.next_section').bind('click', function(){
                        var vali = validate.colors(currentSection);
                        
                        if(vali){
                            currentSection += 1;
                            build.section(currentSection);
                        }
                    });
                    
                    $('.prev_section').bind('click', function(){
                            currentSection -= 1;
                            build.section(currentSection);
                    });

                    $('.form_submit').bind('click', function(){
                        console.log('validate');
                        var input = $('input[type="text"]'),
                            values = {}, error;

                        input.each(function(){

                            values[$(this).attr('name')] = $(this).val();

                        });

                        console.log(values);
                        error = validate.form(values);
                        
                        if(!error){
                            $('.errors').show();
                            return false;
                        }




                    });
                    
                },
                //Contact Section
                contact : function(){
                    
                    var inputs = [];
                    
                    inputs.push('<form action="mail.php" method="POST"><ul class="color_form">')
                    
                    for(var i =0; i < data.contact.length; i += 1){
                        
                        var contactData = data.contact[i];
                            input = '<li><h3>' + contactData.title + '</h3><input type="' + contactData.type + '" name="' + contactData.name + '"/><div class="clear"></div></li>';
                            
                            inputs.push(input);
                        
                    }

                    inputs.push('<input type="hidden" name="colors" value="' + window.location.hash.replace('#', '') + '" />');
                    
                    inputs.push('</ul><input class="button form_submit" type="submit" value="Send Color" /></form>');
                    
                    $('.color_wrp').html(inputs.join(''));

                    build.events();
                    
                },
                //Navigation for Pages
                navigation : function(i){
                    var navigation;
                    if(i === data.sections.length - 1){
                        navigation = '<div class="prev_section button">&larr; Back</div>\
                                                <div class="next_overview button">Next &rarr;</div>';
                    }else if(i === 0){
                        navigation = '<div class="next_section button">Next &rarr;</div>';
                    }else if(i === data.sections.length){
                        navigation = '<div class="prev_section button">&larr; Back</div>\
                                                <div class="next_contact button">Next &rarr;</div>';
                    }else{
                        navigation = '<div class="prev_section button">&larr; Back</div>\
                                                <div class="next_section button">Next &rarr;</div>';
                    }
                    return navigation;
                },
                //All Sections
                overview : function(){
                    var question = [], navigation;
                    
                    for(var i = 0; i < data.sections.length; i += 1){
                        
                        //Create Seperate List
                        question.push('<h3>' + data.sections[i].title + '</h3>');
                        question.push('<ul>');
                        
                        //Loop through all questions
                        question.push(build.questions(i));
                        
                        question.push('<br class="clear" /></ul>');
                    }
                    
                    navigation = build.navigation(currentSection);
                    
                    $('.color_wrp').html('<h2>Overview</h2>\
                                         <ul class="overview">' + question.join('') + '</ul>\
                                        <div class="clear"></div>' + navigation);
                    
                    build.events();
                },
                //Single Section
                //Need to add on test for word colors support for multi colors
                section : function(i){
                    
                    var question = [], navigation;
                    
                    if(typeof data.sections[i] === 'object'){
                    
                        
                    //Create Seperate List
                    question.push('<h3>' + data.sections[i].title + '</h3>');
                    
                    //Loop through all questions
                    question.push(build.questions(i));
                    
                    question.push('<br class="clear" />');
                    
                    navigation = build.navigation(i);
                    
                    $('.color_wrp').html('<h2>Choose Your Color</h2>\
                                         <ul class="overview">' + question.join('') + '</ul>\
                    <div class="clear"></div>' + navigation);
                    
                    build.events();
                    }else{
                        alert('No Section');
                    }
                    
                },
                // Section Questions
                questions : function(i){
                    var questions = [];

                    for(var p = 0; p < data.sections[i].questions.length; p += 1){
                        var theColor = getColor(i, p),
                        multi = /colors/gi.test(data.sections[i].questions[p]),
                        color;

                        //console.log(theColor);
                        
                        if(multi){
                                color = [];
                            q = 0;
                            while(q < theColor.length){
                                color.push('<div class="color_preview fourth" rel="'+ i + '-' + p+' -' + q + '" style="background: #' + color_form.colors[theColor[q]] + ';"><span class="tool-tip"><span class="point"></span>Select A Color</span></div>');
                                q += 1;
                            }

                            color = color.join('');

                        }else{
                            color = '<div class="color_preview " rel="'+ i + '-' + p+'" style="background: ' + theColor + ';"><span class="tool-tip"><span class="point"></span>Select A Color</span></div>';
                        }

                      var  temp = '<li class="lFloat col_third">\
                                 <div class="overview_question lFloat">'+data.sections[i].questions[p]+'</div>\
                                 <div class="color_preview_wrp rFloat">' + color + '</div></div>\
                                 </li>'; 
                            
                        questions.push(temp);
                    }
                    
                    return questions.join('');
                    
                }
                
            };
            
            hash.parser();
            
            currentSection = 0;
            
            build.section(0);
        
            
      
      // Attach Event to clicking on Zoomy - Requires Zoomy with Global Data && Special Color Addon
        $('.zoom')
            .zoomy('hover', {border: '20px solid #fff', zoomSize: 150, glare : false, clickable: true})
            .bind('click', function(){

                console.log(current);
                
                if(typeof current !== 'undefined' && current !== null){
                    var curParse = current.split('-');
                    
                    // Need to test for muli colors commas support multi colors                
                    
                    if(curParse.length === 3){
                        curParse = [parseFloat(curParse[0]), parseFloat(curParse[1]), parseFloat(curParse[2])];
                        //console.log(curParse);    
                    }else{
                        curParse = [parseFloat(curParse[0]), parseFloat(curParse[1])];
                    }

                $('.color_preview.focus').css('background', '#' + color_form.colors[ZoomyS.currentColor]).find('.tool-tip').html(ZoomyS.currentColor);               
                
                    if(curParse.length === 3){    
                        storeData(curParse[0], curParse[1], ZoomyS.currentColor, curParse[2]);
                    }else{
                        storeData(curParse[0], curParse[1], ZoomyS.currentColor);
                    }
                    
                }else{
                    //Need to stop re naviagation
                    confirm('You Need to select a question first');
                    return false;
                }
                //console.log('zoomy click');
                return false;    
            });


    
    }(jQuery));

    var newColors;
//build positions
    (function(){

        var q;
        q= 0
        while(q < 83){
            color_form.pos.push((q + 1) * 10);
        q += 1;
    }

    }())