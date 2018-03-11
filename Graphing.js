"use strict";
/*
 Tyler Green
 CISC 131
 12-10-2014
 Graphing
*/
window.onload=function()
{
	var result;
	var letters;
	var positiveBox
	positiveBox=document.getElementById("positiveBox")
	letters="";
	result=window.prompt("seperate numbers by a , or space or both","");
	result=toArray(result,", ");
	result=trimElements(result);
	result=packArray(result);
	letters=convertToNumber(result);;
	if(letters==="")
	{
		createGraph(result,positiveBox);
	}
	else
	{
		window.alert("ERROR: User must enter only numeric values, these are not acceptable --->"+letters);
	}
};

function createGraph(array,positive)
{
	var thatarray;
	var biggest;
	var i;
	var html;
	html="";
	thatarray= new Array(array.length);
	biggest=Math.abs(array[0]);
	for(i=0;i<array.length;i++)
	{
		if(biggest<=Number(Math.abs(array[i])))
		{
			biggest=Math.abs(array[i]);
		}
	}
	if(array.length>=1)
	{
		thatarray=createScaledArray(array,biggest);
	}
	for(i=0;i<array.length;i++)
	{
		html=html+ createHTMLElement("div", "column"+i, "column", createHTMLElement("div", "box"+i, "background", createHTMLElement("div", "number"+i, "number", array[i])))
	}
	positive.innerHTML=html;
	for(i=0;i<array.length;i++)
	{
		document.getElementById("box"+i).style.backgroundColor=getRandomRGB();
		if(array[i]<0)
		{
			document.getElementById("box"+i).style.top=100+"%";
			document.getElementById("box"+i).style.height=Math.abs(thatarray[i]*100)+"%";
		}
		if(array[i]>0)
		{
			document.getElementById("box"+i).style.top=((1-thatarray[i])*100+"%");
			document.getElementById("box"+i).style.height=thatarray[i]*100+"%";
		}
	}
}

function getRandomInteger(upperLimit)
{
	var result;
	return Math.floor(Math.random()*(upperLimit+1));
    return result;
}

function getRandomRGB()
{
	var red;
	var blue;
	var green;
	red= getRandomInteger(255);
	blue= getRandomInteger(255);
	green= getRandomInteger(255);


	return"rgb(" + red + "," + green + "," + blue + ")";
};

function createHTMLElement(elementType, id, classInfo, content)
{



	if(elementType===null)  //div or span
	{
		elementType="";
	}
	else
	{
		elementType=trim(elementType);
	}

	if(trim(id)===null)  //id
	{
		id="";
	}
	else
	{
		id=" id=" + '"' + trim(id)+ '"';
		if(trim(id).length===0)
		{
			id="";
		}
	}
	if(trim(classInfo)===null)   //classinfo
	{
		classInfo="";
	}
	else
	{
        classInfo=" class=" + '"' + trim(classInfo)+ '"';
		if(trim(classInfo).length===0)
		{
			classInfo="";
		}
	}
	if(content===null)     //content
    {
		content="";
	}

	return "<" + elementType + id + classInfo + ">" + content +"</" + elementType + ">";
}

function createScaledArray(array,scaling)
{
	var i;
	var imposter;
	imposter= new Array(array.length)
	for(i=0;i<array.length;i++)
	{
		imposter[i]=array[i]/scaling;
	}
	return imposter;
}

function convertToNumber(array)
{
	var i;
	var dontWork;
	dontWork="";
	i=0;
	while(i<array.length)
	{
	    if(isNumeric(Number(array[i]))===false || trim(array[i]).length===0)
	    {
			dontWork=dontWork+array[i]+",";
		}
		i=i+1;
	}
	return dontWork.substring(0,dontWork.length-1);

}

function isNumeric(data)
{
	return (isNaN(trim(data))===false && Number(trim(data)).length===undefined && trim(data)!==null);
}

function toArray(data, delimiters)
{
	var delimLoc;
	var start;
	var fieldArray;
	var i;
	i=0;
	start=0;
	if(data===null)
	{
		data="";
	}
	if(delimiters===null)
	{
		delimiters="";
	}
	data=""+data;
	delimiters=""+delimiters;
	if(delimiters==="")
	{
		delimiters=" \n\r\t\f";
	}

	delimLoc=findDelimiters(data,delimiters);
	fieldArray=new Array(delimLoc.length+1);
	while(i<=delimLoc.length)
	{
		fieldArray[i]=data.substring(start,delimLoc[i]);
		start=delimLoc[i]+1;
		i=i+1;
	}
	return fieldArray;
}

function findDelimiters(string,delimiters)
{
	var count;
	var i;
	var locationArray;

	count=0;
	i=0;
	while(i<string.length)
	{
		if(delimiters.indexOf(string.charAt(i))>=0)
		{
			count=count+1;
		}
		i=i+1;
	}
	locationArray= new Array(count);
	count=0;
	i=0;
	while(i<string.length)
	{
		if(delimiters.indexOf(string.charAt(i))>=0)
		{
			locationArray[count]=i;
			count=count+1;
		}
		i=i+1;
	}
	return locationArray;
}

function trimElements(array)
{
	var noWhite;
	var i;
	noWhite=new Array(array.length);
	i=0;
	while(i<noWhite.length)
	{
	    noWhite[i]=trim(array[i]);
	    i=i+1;
	}
	return noWhite;
}

function packArray(array)
{
	var i;
	var count;
	var actual;
	i=0;
	count=0;
	while(i<array.length)
	{
		if(array[i]!==null && array[i]!=="")
		{
			count=count+1;
		}
		i=i+1;
	}
	actual=new Array(count);
	i=0;
	count=0;
	while(i<array.length)
	{
		if(array[i]!==null && array[i]!=="")
		{
			actual[count]=array[i];
			count=count+1;
		}
		i=i+1;
	}
	return actual;
}

function trim(data)
{
	var whitespace;
	var start;
	var end;
	var result;
    if(typeof data==="string")   //first if
    {
		whitespace=" \n\r\t\f";
		start=0;
		while(start<data.length && whitespace.indexOf(data.charAt(start))>=0) //first while
		{
			start=start+1;
		}
		end=data.length-1;
		while(end>=0 && whitespace.indexOf(data.charAt(end))>=0)   //second while
		{
			end=end-1;
		}
		if(end<start)    //second if
		{
			result="";
		}
		else         //else to second if
		{
			result= data.substring(start,end+1);
		}

	}
	else
	{
		result=data;
	}
return result;
}

