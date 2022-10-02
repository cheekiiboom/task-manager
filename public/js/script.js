// Michael Singer mis825@lehigh.edu

$(document).ready(function () {
    $("#wait-talk").hide();
    // When the page loads, get the tasks from the server and display them in the table
    $.ajax({
        url: '/tasks',
        type: 'GET',
        success: function (data) {
            // Loop through the data and display it in the table
            for (let i = 0; i < data.length; i++) {
                let task = data[i];
                let row = `<tr class="task" data-id="${task.id}">
                                <td><input type="checkbox"></td>
                                <td>${task.description}</td>
                                <td>${task.taskType}</td>
                                <td>${task.date}</td>
                            </tr>`;
                $('table').append(row);
            }
        }
    });
    // When the user clicks the Add button, send the data to the server and add the task to the table
    $('input[value="Add"]').on('click', function (event) {
        event.preventDefault();
        let description = $('#description').val();
        let date = $('#date').val();
        let type = $('#type').val();
        // check if wait-talk is visible
        if ($('#wait-talk').is(':visible')) {
            let waitTalk = $('#wait-talk').val();
            type += waitTalk;
        }

        $.ajax({
            url: '/tasks',
            type: 'POST',
            data: {
                description: description,
                date: date,
                type: type
            },
            success: function (data) {
                // Delete the tasks from the table with the class of task
                $('.task').remove();

                // Loop through the data and display it in the table
                for (let i = 0; i < data.length; i++) {
                    let task = data[i];
                    // If the type is waiting or talk, add the wait-talk value to the task type
                    // Only for the added task
                    if (task.id === data[data.length - 1].id && (type === 'WaitingFor: ' || type === 'TalkTo: ')) {
                        task.taskType = type + waitTalkVal;
                    }
                    let row = `<tr class="task" data-id="${task.id}">
                                    <td><input type="checkbox"></td>
                                    <td>${task.description}</td>
                                    <td>${task.taskType}</td>
                                    <td>${task.date}</td>
                                </tr>`;
                    $('table').append(row);
                }

                
                // Clear the form
                $('#description').val('');
                $('#date').val('');
                $('#type').val('NextAction');
                $('#wait-talk').val('');
                $('#wait-talk').hide();
            }
        });
    });
    // When the user clicks the Delete button, send the data to the server and delete the task from the table
    // Delete all the tasks with the class of task that have a checkbox that is checked
    $('input[value="Delete"]').on('click', function (event) {
        event.preventDefault();
        let tasksToDelete = [];
        $('.task').each(function () {
            let id = $(this).data('id');
            let checked = $(this).find('input[type="checkbox"]').is(':checked');
            if (checked) {
                tasksToDelete.push(id);
            }
        });

        // loop through each task and make an ajax call to delete it
        for (let i = 0; i < tasksToDelete.length; i++) {
            let id = tasksToDelete[i];
            $.ajax({
                url: '/tasks/' + id,
                type: 'DELETE',
                success: function (data) {
                    // Delete the tasks from the table with the class of task
                    $('.task').remove();

                    // Loop through the data and display it in the table
                    for (let i = 0; i < data.length; i++) {
                        let task = data[i];
                        let row = `<tr class="task" data-id="${task.id}">
                                        <td><input type="checkbox"></td>
                                        <td>${task.description}</td>
                                        <td>${task.taskType}</td>
                                        <td>${task.date}</td>
                                    </tr>`;
                        $('table').append(row);
                    }
                }
            });
        }
    });
});

$('#type').on('change', function () {
    let type = $(this).val();
    if (type === 'WaitingFor: ' || type === 'TalkTo: ') {
        console.log('show');
        $('#wait-talk').show();
    } else {
        console.log('hide');
        $('#wait-talk').hide();
    }
});
