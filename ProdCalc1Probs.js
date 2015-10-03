 //create variable to hold probs
var Problems = {};
Problems["Example2"] = {Givens:["b&a"], Show:"{a&b}"};
Problems["My First Proof"] = {Givens:["b&a","c"], Show:"{a&b}&{c&a}"};
Problems["andComm"] = {Givens:[], Show:"{a&b}->{b&a}"};
Problems["impImp"] = {Givens:[], Show:"p->{q->p}"};
Problems["impAnd1"] = {Givens:[], Show:"p->{q->{p&q}}"};
Problems["andAndAnd"] = {Givens:[], Show:"{{p&q}&r}->{p&{q&r}}"};
Problems["andMonotone"] = {Givens:[], Show:"{p->q}->{{p&r}->{q&r}}"};
Problems["impAnd2"] = {Givens:[], Show:"{p&q}->{p&{p->q}}"};
Problems["Shunting1"] = {Givens:[], Show:"{{p&q}->r}->{p->{q->r}}"};
Problems["Shunting2"] = {Givens:[], Show:"{p->{q->r}}->{{p&q}->r}"};
Problems["orComm"] = {Givens:[], Show:"{a|b}->{b|a}"};
Problems["orImp"] = {Givens:[], Show:"{{a|b}&{{a->c}&{b->c}}}->c"};
Problems["andOr1"] = {Givens:[], Show:"{p&q}->{p|q}"};
Problems["andOr2"] = {Givens:[], Show:"{p|{q&r}}->{p|q}"};
Problems["andOr3"] = {Givens:[], Show:"{p&{p->q}}->{p&q}"};
Problems["orMonotone"] = {Givens:[], Show:"{p->q}->{{p|r}->{q|r}}"};
Problems["Absorption1"] = {Givens:[], Show:"{p|{p&q}}->p"};
Problems["Absorption2"] = {Givens:[], Show:"p->{p&{p|q}}"};
Problems["notNot1"] = {Givens:["p"], Show:"not(not p)"};
Problems["notNot2"] = {Givens:["not(not p)"], Show:"p"};
Problems["allComm"] = {Givens:[], Show:"{All x {All y { x R y}}} -> {All y1 {All x1 { x1 R y1}}}"};
Problems["impAll1"] = {Givens:[], Show:"{All x {{Q x} -> {P x}}} -> { {All x {Q x}} -> {All x {P x}} }"};
Problems["CourseOfValues"] = {Givens:["{All j {{L j} -> {P j}}} -> {All n {L n}}"], Show:"{All j {{L j} -> {P j}}} -> {All n {P n}}"};


function getProblem(Title){//return the elements of the problem specified
	
	return Problems[Title];
}

//variables to hold all names in 
names = Object.keys(Problems);
length = names.length;
