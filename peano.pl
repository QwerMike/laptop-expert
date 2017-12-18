% proc manufacturer
% manufacturer
% display diagonal
% RAM
% Drive Type
% Drive Capacity
% GPU
% Touchscreen
computer("link", notebook, 5, 5, 7).
computer("link6", notebook, 1, 34, 6).
computer("link2", desktop, 8, 6, 6).
computer("link3", desktop, 8, 6, 6).
computer("link4", desktop, 4, 4, 6).
computer("link5", desktop, 9, 4, 6).

get_link(Type, Ram, Proc, Price, Link) :-
    computer(Link, Type, Ram, Proc, Price).

get_links(Type, Ram, Proc, Price, Results) :-
    findall(X0, get_link(Type, Ram, Proc, Price, X0), [Link|Links]),
    peano(Link, [Link|Links], Links, Results).

peano(Link, Links, [Next|Rest], [Link|Results]):-
    not(is_dominated(Link, Links)),
    peano(Next, Links, Rest, Results). 

peano(Link, Links, [Next|Rest], Results):-
    is_dominated(Link, Links),
    peano(Next, Links, Rest, Results).

peano(Link, Links, [], [Link]):-
    not(is_dominated(Link, Links));
    Link = "".

is_dominated(Link, [Link1|Links]):-
    computer(Link, _, Ram, Proc, Price),
    computer(Link1, _, Ram2, Proc2, Price2),
    (
    Ram2 >= Ram, Proc2 >= Proc, Price2 =< Price,
    (Ram \== Ram2; Proc \== Proc2; Price \== Price2);
    is_dominated(Link, Links)
    ).
