require "CSV"

# Paths to the files
filepath = '../../data/raw/results.csv'
final_path = '../../data/processed/results_cleaned.csv'

# The date columns that need formated
date_columns_to_clean = [
    'date',
]

# Import the csv file
puts 'Reading the file...'
csv_file = CSV.read(filepath, :headers => true)

# Function to format the dates
def format_dates(table, columns)
    # Informe the user
    puts "Cleaning dates..."

    # Iterate over the storms table
    table.each do |row|
        # Iterate over the date columns
        columns.each do |column|
            # Format and replace the date
            date = Date.parse(row[column])
            row[column] = date.strftime('%d.%m.%Y')
        end
    end

    # Return the table
    table
end

csv_file = format_dates(csv_file, date_columns_to_clean)

# Informe the user
puts "Creating the file..."
# Create the cleand file with the data
File.open(final_path, 'w') do |f|
    f.write(csv_file.to_csv)
end
