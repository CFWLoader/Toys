library(MASS)

clean_and_reformat_as_matrix <- function(data)
{
    # print(head(data, 10))

    rows = length(data[,1])

    tuple_len = length(data[0,])

    remove_record = c()

    for(row in c(1:rows))
    {
        for(col in c(1:tuple_len))
        {           
            if(data[row, col] == '?')
            {
                remove_record = c(remove_record, -row)

                break
            }
        }
    }

    # print(remove_record)

    cleaned = data[remove_record, c(-tuple_len)]

    # print(head(cleaned)

    clean_list = c()

    for(row in (1:length(cleaned[,1])))
    {
    #     print(cleaned[row,])
    #     print(as.numeric(cleaned[row,]))
        clean_list = c(clean_list, as.numeric(cleaned[row,]), 1)
    }

    # print(head(clean_list, 12))

    return(list(matrix(clean_list, nrow = length(cleaned[, 1]), byrow = TRUE), 
        matrix(as.numeric(data[remove_record, c(tuple_len)]), nrow = length(cleaned[, 1]), byrow = TRUE)))

    # for(row in c(1:length(cleaned[, 1])))
    # {
    #     for(col in c(1:tuple_len))
    #     {           
    #         if(cleaned[row, col] == '?')
    #         {
    #             print(paste(row, "? ocurred."))

    #             break
    #         }
    #     }
    # }
}

original_data = read.csv('./dataset/wiki4HE.csv', sep = ';', stringsAsFactor = FALSE)

extract_data = original_data[c(11:16)]

# print(head(extract_data))

packed = clean_and_reformat_as_matrix(extract_data)

# print(packed)

data_mat = packed[[1]]

y = packed[[2]]

transpose_mat = t(data_mat)

mul = transpose_mat %*% data_mat

mul_inv = ginv(mul)

w = mul_inv %*% transpose_mat %*% y

# print(w)

print(y[2])

print(data_mat[2,] %*% w)