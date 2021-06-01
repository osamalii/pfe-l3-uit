router.post('/demander_rendez-vous', ensureAuthenticated, (req, res) => {
    let _userId = req.body._userId;
    if (_userId == req.user._id && req.user.AccountType === 'patient') { //later ensure that he's not vaccinated yet or he's asking for 2 rendez-vous
        const city = cin2City(req.user.cin);
        City.findOne({name: city.toUpperCase()})
            .then(theCity => {
                if (theCity) {
                    console.log(city);
                    const theCenter = getMinCapacity(theCity.centers);
                    console.log(theCenter);
                    if (theCenter) {
                        Calendar.findOne({_centerId: theCenter._id})
                            .then(theCalendar => {
                                if (theCalendar) {
                                    const numPatient = theCalendar.numPatients;
                                    if(numPatient < theCenter.capacity){
                                        Calendar.findOne().sort({'date':-1}).limit(1).then(theCalendar => {
                                            if(!theCalendar){
                                                theCalendar = new Calendar({
                                                    numPatient: 1,
                                                    _centerId:theCenter._id,
                                                    Appointment: [],
                                                    date: moment('2021-06-01').add(1, 'day')
                                                });
                                                theCalendar.save()
                                            }
                                            if(theCalendar){
                                                const rendez_vous = new Appointment ({
                                                    date: theCalendar.date,
                                                    _userId: _userId,
                                                    dayRang: (numPatient < theCenter.capacity / 2) ? 'am' : 'pm'
                                                });
                                                rendez_vous.save()
                                                    .then(()=>{
                                                        theCalendar.appointments.push({_appointmentId: rendez_vous._id});
                                                        theCalendar.save();
                                                    })
                                            }
                                        });
                                    }else {
                                        Calendar.findOne().sort({'date':-1}).limit(1).then(theCalendar => {
                                            if(!theCalendar){
                                                theCalendar = new Calendar({
                                                    numPatient: 1,
                                                    _centerId:theCenter._id,
                                                    Appointment: [],
                                                    date: moment('2021-06-01').add(1, 'day')
                                                });
                                                theCalendar.save();
                                            }
                                            if(theCalendar){
                                                const newCalendar = new Calendar({
                                                    numPatient: 1,
                                                    _centerId:theCenter._id,
                                                    appointments: [],
                                                    date: moment(theCalendar.date).add(1, 'day')
                                                });
                                                newCalendar.save()
                                                    .then(()=>{
                                                        const rendez_vous = new Appointment ({
                                                            date: newCalendar.date,
                                                            _userId: _userId,
                                                            dayRang: (numPatient < theCenter.capacity / 2) ? 'am' : 'pm'
                                                        });
                                                        newCalendar.appointment.push({_appointmentId: rendez_vous._id});
                                                        newCalendar.save();
                                                    });
                                            }
                                        });
                                    }
                                }else {

                                }
                            })
                    }
                }
            });
    }
});
