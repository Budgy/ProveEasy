 // create array to hold probs


                    
var Problems = {};
Problems["andComm"] = {Givens:[], Show:"{a&b}->{b&a}"};
Problems["impImp"] = {Givens:[], Show:"p->{q->p}"};
Problems["impAnd1"] = {Givens:[], Show:"p->{q->{p&q}}"};
Problems["andAndAnd"] = {Givens:[], Show:"{{p&q}&r}->{p&{q&r}}"};
Problems["andMonotone"] = {Givens:[], Show:"{p->q}->{{p&r}->{q&r}}"};
Problems["impAnd2"] = {Givens:[], Show:"{p&q}->{p&{p->q}}"};
Problems["orComm"] = {Givens:[], Show:"{a|b}->{b|a}"};
Problems["orImp"] = {Givens:[], Show:"{{a|b}&{{a->c}&{b->c}}}->c"};
Problems["orMonotone"] = {Givens:[], Show:"{p->q}->{{p|r}->{q|r}}"};
Problems["andOr1"] = {Givens:[], Show:"{p&q}->{p|q}"};
Problems["andOr2"] = {Givens:[], Show:"{p|{q&r}}->{p|q}"};
Problems["andOr3"] = {Givens:[], Show:"{p&{p->q}}->{p&q}"};
Problems["Absorption1"] = {Givens:[], Show:"{p|{p&q}}->p"};
Problems["Absorption2"] = {Givens:[], Show:"p->{p&{p|q}}"};
Problems["notNot1"] = {Givens:["p"], Show:"not(not p)"};
Problems["notNot2"] = {Givens:["not(not p)"], Show:"p"};
Problems["allComm"] = {Givens:[], Show:"{All x {All y { x R y}}} -> {All y1 {All x1 { x1 R y1}}}"};
Problems["exAll"] = {Givens:[], Show:"{Ex x {All y { x R y}}} -> {All y {Ex x { x R y}}} "};
Problems["plusAssoc"] = {Givens:[], Show:"All l {All m {All n { {l + {m + n}} = {{l + m} + n} }}}"};
//Problems["plusComm"] = {Givens:[], Show:"All l {All m {All n { {l + {m + n}} = {{l + m} + n} }}}"};
Problems["impAll1"] = {Givens:[], Show:"{All x {{Q x} -> {P x}}} -> { {All x {Q x}} -> {All x {P x}} }"};
Problems["test"] = {Givens:['P x'], Show:"P x"};



function getProblem(Title){// get the goal for a specific problem
	
	return Problems[Title];
}

names = Object.keys(Problems);
length = names.length;
