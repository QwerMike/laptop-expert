function callback(answer) {
    console.log(answer);
    console.log(pl.format_answer(answer));
}

const session = pl.create(10000);

session.consult(`
nonStopTrain(sandiego,oceanside).
nonStopTrain(sandiego,lviv).
nonStopTrain(lviv, losangeles).
nonStopTrain(lasvegas,sandiego).
nonStopTrain(sanfrancisco,bakersfield).
nonStopTrain(bakersfield,sandiego).
nonStopTrain(oceanside,losangeles).
nonStopTrain(portland,sanfrancisco).
nonStopTrain(seattle,portland).
nonStopTrain(losangeles, toronto).

routeTrip(X, Y, [X, Y]) :- nonStopTrain(X, Y).

routeTrip(X, Y, [X | Trip]) :- nonStopTrain(X,Z ), routeTrip(Z, Y, Trip).
`);

const what = session.query("routeTrip(sandiego,toronto, X).");
session.answer(callback);