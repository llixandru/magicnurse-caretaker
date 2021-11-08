/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['knockout', 'appController', 'ojs/ojmodule-element-utils', 'accUtils', 'ojs/ojcontext', "ojs/ojinputtext", "ojs/ojlabel", "ojs/ojbutton", "ojs/ojformlayout", "ojs/ojbutton"],
    function(ko, app, moduleUtils, accUtils, Context) {

        function DashboardViewModel() {
            var self = this;

            // Wait until header show up to resolve
            var resolve = Context.getPageContext().getBusyContext().addBusyState({ description: "wait for header" });
            // Header Config
            self.headerConfig = ko.observable({ 'view': [], 'viewModel': null });
            moduleUtils.createView({ 'viewPath': 'views/header.html' }).then(function(view) {
                self.headerConfig({ 'view': view, 'viewModel': app.getHeaderModel() })
                resolve();
            })

            // Below are a set of the ViewModel methods invoked by the oj-module component.
            // Please reference the oj-module jsDoc for additional information.

            /**
             * Optional ViewModel method invoked after the View is inserted into the
             * document DOM.  The application can put logic that requires the DOM being
             * attached here.
             * This method might be called multiple times - after the View is created
             * and inserted into the DOM and after the View is reconnected
             * after being disconnected.
             */
            self.connected = function() {
                accUtils.announce('Dashboard page loaded.', 'assertive');
                document.title = "Dashboard";
                // Implement further logic if needed
                this.ssn = ko.observable()
                this.hospital = ko.observable()
                this.diagnosis = ko.observable()
                this.medicineName = ko.observable()
                this.medicineType = ko.observable()
                this.schedule = ko.observable()
                this.store = ko.observable()

                askRefill = async() => {
                    let myHeaders = new Headers();
                    myHeaders.append("Content-Type", "application/json");

                    const raw = {
                        "social_security_number": this.ssn,
                        "doctor_hospital_name": this.hospital,
                        "diagnosis": this.diagnosis,
                        "prescription_id": "3245655677889",
                        "prescription_start_date": "2021-11-05T18:25:43Z",
                        "prescription_end_date": "2021-12-05T18:25:43Z",
                        "medicine_name": this.medicineName,
                        "medicine_type": this.medicineType,
                        "schedule": this.schedule,
                        "refill_store": this.store,
                        "prescription_status": "Active"
                    }

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };

                    fetch("https://ml6qk3ro6t3gvrvdbsgwt6iivq.apigateway.eu-frankfurt-1.oci.customer-oci.com/magicnurse/prescription/", requestOptions)
                        .then(response => response.text())
                        .then(result => console.log(result))
                        .catch(error => console.log('error', error))
                }
            };

            /**
             * Optional ViewModel method invoked after the View is disconnected from the DOM.
             */
            self.disconnected = function() {
                // Implement if needed
            };

            /**
             * Optional ViewModel method invoked after transition to the new View is complete.
             * That includes any possible animation between the old and the new View.
             */
            self.transitionCompleted = function() {
                // Implement if needed
            };
        }

        /*
         * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
         * return a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.
         */
        return DashboardViewModel;
    }
);