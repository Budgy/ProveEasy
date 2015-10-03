 // create array to hold probs


                    
var Problems = {};
Problems["andComm"] = "{a&b}->{b&a}";
Problems["impImp"] = "p->{q->p}";
Problems["impAnd1"] = "p->{q->{p&q}}";
Problems["andAndAnd"] = "{{p&q}&r}->{p&{q&r}}";
Problems["andMonotone"] = "{p->q}->{{p&r}->{q&r}}";
Problems["impAnd2"] = "{p&q}->{p&{p->q}}";
Problems["Shunting1"] = "{{p&q}->r}->{p->{q->r}}";
Problems["Shunting2"] = "{p->{q->r}}->{{p&q}->r}";
//Problems["allComm"] = "{all x {all y {x R y}}} -> {all y1 {all x1 { x1 R y1}}}";
//Problems["impAll1"] = "{all x {{Q x} -> {P x}}} -> { {all x {Q x}} -> {all x {P x}} }";




function getProblem(Title){// get the goal for a specific problem
	
	return Problems[Title];
}

names = Object.keys(Problems);
length = names.length;
